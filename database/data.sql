-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

  insert into "users"
    ("email", "phoneNumber", "username")
    values
      ('example@gmail.com', '555-555-5555', 'vogt_marshall');

  insert into "events" ("title", "locationName", "locationAddress", "date", "eventFlyer", "cost")
      values ('Groove Garden', '701 Nightclub', '123 Main St., Santa Ana, Ca', '2023-10-14', '/images/flyer1.jpg', '15');

  insert into "events" ("title", "locationName", "locationAddress", "date", "eventFlyer", "cost")
      values ('New Event', 'Mission Bar', '456 Main St., Santa Ana, Ca', '2023-10-21', '/images/flyer1.jpg', '15');

  insert into "artists" ("name")
      values ('melloMarsh');

  insert into "userEvents" ("userId", "eventId", "ticketCount")
      values ('1', '1', '2');
