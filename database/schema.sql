set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "email" text,
  "phoneNumber" text,
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

CREATE TABLE "artists" (
  "artistId" serial PRIMARY KEY,
  "name" text,
  "createdAt" timestamptz default now()
);

CREATE TABLE "userEvents" (
  "userId" integer,
  "eventId" integer,
  "ticketCount" integer,
  PRIMARY KEY ("userId", "eventId")
);

CREATE TABLE "artistEvents" (
  "artistId" integer,
  "eventId" integer
);

ALTER TABLE "userEvents" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "userEvents" ADD FOREIGN KEY ("eventId") REFERENCES "events" ("eventId");

ALTER TABLE "artistEvents" ADD FOREIGN KEY ("artistId") REFERENCES "artists" ("artistId");

ALTER TABLE "artistEvents" ADD FOREIGN KEY ("eventId") REFERENCES "events" ("eventId");
