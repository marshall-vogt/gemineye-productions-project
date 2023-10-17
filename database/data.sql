-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

  insert into "users"
    ("username", "hashedPassword")
    values
      ('guest', '$argon2id$v=19$m=4096,t=3,p=1$T//QYcENPazrlTPeTqmD2A$bFFlNG0GZZFzOh3awD1ycZIjQrUDMKcuxXuilviT6Hk');

  insert into "events" ("title", "locationName", "locationAddress", "date", "eventFlyer", "cost")
      values ('Groove Garden', '701 Nightclub', '100 Main St., Santa Ana, Ca', '2023-10-15', '/images/flyer2.jpg', '15');

  insert into "events" ("title", "locationName", "locationAddress", "date", "eventFlyer", "cost")
      values ('Sonido', 'Mission Bar', '302 Main St., Santa Ana, Ca', '2023-10-22', '/images/flyer1.jpg', '15');

  insert into "events" ("title", "locationName", "locationAddress", "date", "eventFlyer", "cost")
      values ('Spooky Grooves', '701 Nightclub', '100 Main St., Santa Ana, Ca', '2023-10-29', '/images/flyer1.jpg', '15');

 -- insert into "artists" ("name")
 --     values ('melloMarsh');
