-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

  insert into "users"
    ("email", "phoneNumber", "firstName", "lastName")
    values
      ('example@gmail.com', '555-555-5555', 'marshall', 'vogt');

  insert into "events" ("title", "locationName", "locationAddress", "date", "eventFlyer", "cost")
      values ('Groove Garden', '701 Nightclub', '123 Main St., Santa Ana, Ca', '2023-10-14', '/images/flyer1.jpg', '15');

  insert into "events" ("title", "locationName", "locationAddress", "date", "eventFlyer", "cost")
      values ('New Event', 'Mission Bar', '456 Main St., Santa Ana, Ca', '2023-10-21', '/images/flyer1.jpg', '15');

  insert into "artists" ("name")
      values ('melloMarsh')
