/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import { ClientError, errorMiddleware, authMiddleware } from './lib/index.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

// Get all events

app.get('/api/events', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "events"
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// Get individual event

app.get('/api/events/:eventId', async (req, res, next) => {
  try {
    const eventId = Number(req.params.eventId);
    if (!eventId) {
      throw new ClientError(400, 'eventId must be a positive integer');
    }
    const sql = `
      select *
        from "events"
        where "eventId" = $1
    `;
    const params = [eventId];
    const result = await db.query<Event>(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(404, `cannot find event with eventId ${eventId}`);
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// Get events purchased by user

app.get('/api/userEvents/:userId', authMiddleware, async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    if (!userId) {
      throw new ClientError(400, 'userId must be a positive integer');
    }
    const sql = `
      select *
        from "userEvents" as u
        join "events" as e using ("eventId")
        where "userId" = $1;
    `;
    const params = [userId];
    const result = await db.query<Event>(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// Purchase event

const algorithm = 'aes-128-gcm';
const iv = Buffer.alloc(16);
const key = '0613';
const paddedkey = Buffer.concat([Buffer.from(key), Buffer.alloc(12)]);

function encrypt(
  text: string,
  algorithm: crypto.CipherGCMTypes,
  key: crypto.CipherKey
): string {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

app.post(
  '/api/userEvents/:eventId/:userId',
  authMiddleware,
  async (req, res, next) => {
    try {
      const eventId = Number(req.params.eventId);
      if (!eventId) {
        throw new ClientError(400, 'eventId must be a positive integer');
      }
      const userId = Number(req.params.userId);
      if (!userId) {
        throw new ClientError(400, 'userId must be a positive integer');
      }
      const ticketCount = Number(req.body.ticketCount);
      if (!ticketCount) {
        throw new ClientError(400, 'ticketCount must be a positive integer');
      }

      for (let i = 1; i <= ticketCount; i++) {
        const codeText = JSON.stringify({
          eventId,
          userId,
          ticketNumber: i,
          createdAt: Date.now(),
        });
        const hashedCode = encrypt(codeText, algorithm, paddedkey);
        const sql = `
      insert into "userEvents" ("eventId", "userId", "hashedCode")
        values ($1, $2, $3)
        returning *;
    `;
        const params = [eventId, userId, hashedCode];
        const result = await db.query(sql, params);
      }
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }
);

// Sign-up

app.post('/api/users/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username", "createdAt";
    `;
    const params = [username, hashedPassword];
    const result = await db.query(sql, params);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// Sign-in

app.post('/api/users/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const enteredPassword = password;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }

    const sql = `
    select "userId",
            "hashedPassword"
        from "users"
        where "username" = $1;
            `;
    const result = await db.query(sql, [username]);
    const resultRow = result.rows[0];
    if (!resultRow) {
      throw new ClientError(401, `Incorrect username or password`);
    }
    const isMatching = await argon2.verify(
      resultRow.hashedPassword,
      enteredPassword
    );
    if (!isMatching) {
      throw new ClientError(401, `Invalid login: password did not match`);
    }
    const payload = {
      userId: resultRow.userId,
      username,
    };
    const token = jwt.sign(payload, hashKey);
    res.status(200).json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Vite server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
