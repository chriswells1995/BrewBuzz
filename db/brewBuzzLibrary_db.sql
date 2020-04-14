-- DROP DATABASE IF EXISTS brewBuzzLibrary_db;
-- CREATE DATABASE brewBuzzLibrary_db;
-- sets dependency on brewBuzzLibrary_db
USE brewBuzzLibrary_db;


-- CREATE TABLE breweries(
--   id INTEGER(11) AUTO_INCREMENT NOT NULL,

--   name VARCHAR(100) NOT NULL,
--   website VARCHAR(100),
--   streetAddress VARCHAR(100) NOT NULL,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE reviews(
--   id INTEGER(11) AUTO_INCREMENT NOT NULL,
--   review VARCHAR(100)NOT NULL,
--   userID INT (10) NOT NULL,
--   breweryID INT (10) NOT NULL,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE users(
--   id INTEGER(11) AUTO_INCREMENT NOT NULL,
--   email VARCHAR(100) NOT NULL,
--   password VARCHAR(100) NOT NULL,
--   PRIMARY KEY (id)
-- );

INSERT INTO users (email, password) values ('rwilliams01101@gmail.com', 'beerpassword');
INSERT INTO users (email, password) values ('wells457@umn.edu', 'beerpassword');
INSERT INTO users (email, password) values ('cwbatman007@yahoo.com', 'beerpassword');

INSERT INTO breweries (name, website, streetAddress) values ('Venn Brewing', 'https://www.vennbrewing.com/', '3550 E 46th St Suite 140, Minneapolis, MN 55406');
INSERT INTO breweries (name, website, streetAddress) values ('Surly Brewing Co', 'https://surlybrewing.com/','520 Malcolm Ave SE, Minneapolis, MN 55414');
INSERT INTO breweries (name, website, streetAddress) values ('Invictus', 'http://invictusbrewingco.com/', '2025 105th Ave NE, Blaine, MN 55449');


INSERT INTO reviews (Review, UserId, BreweryId) values ('Test 1', 1,1);
INSERT INTO reviews (Review, UserId, BreweryId) values ('Test 2', 1,2);
INSERT INTO reviews (Review, UserId, BreweryId) values ('Test 3', 2,2);
INSERT INTO reviews (Review, UserId, BreweryId) values ('Test 4', 2,3);
INSERT INTO reviews (Review, UserId, BreweryId) values ('Test 5', 3,1);
INSERT INTO reviews (Review, UserId, BreweryId) values ('Test 6', 3,3);



-- -- This will show the reviews for each brewery
-- SELECT name, review
-- FROM breweries
-- RIGHT JOIN reviews ON breweries.id = reviews.breweryID;
-- -- IS null rather than equals null
-- -- WHERE breweries.authorId IS NULL;

-- -- This will show the reviews from each user
-- SELECT email, review
-- FROM users
-- RIGHT JOIN reviews ON users.id = reviews.userID;