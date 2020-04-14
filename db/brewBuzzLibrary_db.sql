DROP DATABASE IF EXISTS brewBuzzLibrary_db;
CREATE DATABASE brewBuzzLibrary_db;
-- sets dependency on brewBuzzLibrary_db
USE brewBuzzLibrary_db;


CREATE TABLE breweries(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,

  name VARCHAR(100),
  website VARCHAR(100),
  streetAddress VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE users(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  review VARCHAR(100),
  userID INT (10),
  breweryID INT (10),
  PRIMARY KEY (id)
);

CREATE TABLE reviews(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  PRIMARY KEY (id)
);

INSERT INTO users (email, password) values ('Jane', 'Austen');
INSERT INTO users (email, password) values ('Mark', 'Twain');
INSERT INTO users (email, password) values ('Lewis', 'Carroll');

INSERT INTO breweries (id, name, website, streetAddress) values ('Pride and Prejudice', 1);
INSERT INTO breweries (id, name, website, streetAddress) values ('Emma', 1);
INSERT INTO breweries (id, name, website, streetAddress) values ('The Adventures of Tom Sawyer', 2);
INSERT INTO breweries (id, name, website, streetAddress) values ('Adventures of Huckleberry Finn', 2);
INSERT INTO breweries (id, name, website, streetAddress) values ('Alices Adventures in Wonderland', 3);
INSERT INTO breweries (id, name, website, streetAddress) values ('Dracula', null);

INSERT INTO reviews (id, review, userID, breweryID) values ('Pride and Prejudice', 1);
INSERT INTO reviews (id, review, userID, breweryID) values ('Emma', 1);
INSERT INTO reviews (id, review, userID, breweryID) values ('The Adventures of Tom Sawyer', 2);
INSERT INTO reviews (id, review, userID, breweryID) values ('Adventures of Huckleberry Finn', 2);
INSERT INTO reviews (id, review, userID, breweryID) values ('Alices Adventures in Wonderland', 3);
INSERT INTO reviews (id, review, userID, breweryID) values ('Dracula', null);

-- SELECT * FROM users;
-- SELECT * FROM breweries;

-- -- show ALL breweries with users
-- -- INNER JOIN will only return all matching values from both tables
-- SELECT title, id, email, password
-- FROM breweries
-- INNER JOIN users ON breweries.authorId = users.id;

-- -- show ALL breweries, even if we don't know the author
-- -- LEFT JOIN returns all of the values from the left table, and the matching ones from the right table
-- SELECT title, id, email, password
-- FROM breweries
-- LEFT JOIN users ON breweries.authorId = users.id;

-- -- show ALL breweries, even if we don't know the author
-- -- RIGHT JOIN returns all of the values from the right table, and the matching ones from the left table
-- SELECT title, id, email, password
-- FROM breweries
-- RIGHT JOIN users ON breweries.authorId = users.id;

SELECT title, id, email, password
FROM breweries
LEFT JOIN users ON breweries.authorId = users.id
-- IS null rather than equals null
WHERE breweries.authorId IS NULL;