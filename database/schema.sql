set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "username" text UNIQUE,
  "createdAt" timestamptz default now(),
  "hashedPassword" text
);

CREATE TABLE "events" (
  "eventId" serial PRIMARY KEY,
  "title" text,
  "createdAt" timestamptz default now(),
  "locationName" text,
  "locationAddress" text,
  "date" date,
  "eventFlyer" text,
  "cost" integer
);

CREATE TABLE "userEvents" (
  "ticketId" serial PRIMARY KEY,
  "userId" integer,
  "eventId" integer,
  "hashedCode" text UNIQUE
);

ALTER TABLE "userEvents" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "userEvents" ADD FOREIGN KEY ("eventId") REFERENCES "events" ("eventId");
