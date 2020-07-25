-- Delete any existing tables
USE cs361_belknapj;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS CodeLocations;
DROP TABLE IF EXISTS CityLocations;
DROP TABLE IF EXISTS UserCodeLocations;
DROP TABLE IF EXISTS UserCityLocations;
SET FOREIGN_KEY_CHECKS = 1;

-- Create Users table
SELECT 'Creating Users table' as '';

CREATE TABLE `Users` (
`user_id` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
`username` varchar(255) NOT NULL UNIQUE,
`password` varchar(255) NOT NULL,
`email_addr` varchar(255) DEFAULT NULL,
`max_locs` int(11) DEFAULT 5,
`admin_flag` boolean DEFAULT false,
PRIMARY KEY (`user_id`)
);

-- Team members will have admin privileges
INSERT INTO `Users` (`username`, `password`, `email_addr`, `admin_flag`) VALUES
('belknapj', 'expanse', 'belknapj@oregonstate.edu', true)
,('chewje', 'expanse', NULL, true)
,('mannry', 'expanse', NULL, true)
,('brynmool', 'expanse', NULL, true)
,('matyevaa', 'expanse', NULL, true)
;

SELECT * from Users;

-- Create CodeLocations table (locations specified by postal code)
SELECT 'Creating CodeLocations table' as '';

CREATE TABLE `CodeLocations` (
`code_id` int(11) NOT NULL AUTO_INCREMENT,
`zipcode` varchar(255) NOT NULL UNIQUE,
PRIMARY KEY (`code_id`)
);

-- zip code for belknapj
INSERT INTO `CodeLocations` (`zipcode`) VALUES
('75028')
;

SELECT * FROM CodeLocations;

-- Create UserCodeLocations table (connects user with postal code)
SELECT 'Creating UserCodeLocations table' as '';

CREATE TABLE `UserCodeLocations` (
`user_id` int(11) NOT NULL,
`code_id` int(11) NOT NULL,
PRIMARY KEY (`user_id`, `code_id`),
FOREIGN KEY (`user_id`) REFERENCES Users(`user_id`) ON DELETE NO ACTION,
FOREIGN KEY (`code_id`) REFERENCES CodeLocations(`code_id`) ON DELETE NO ACTION
);

-- Connect belknapj to zip code
INSERT INTO `UserCodeLocations` (`user_id`, `code_id`) VALUES
((SELECT user_id FROM Users WHERE username = 'belknapj'), 
 (SELECT code_id FROM CodeLocations WHERE zipcode = '75028')
)
;

-- Create CityLocations table
SELECT 'Creating CityLocations table' as '';

CREATE TABLE `CityLocations` (
`city_id` int(11) NOT NULL AUTO_INCREMENT,
`city` varchar(255) NOT NULL,
`state` varchar(255) NOT NULL DEFAULT 'OR',
`country` varchar(255) NOT NULL DEFAULT 'US',
PRIMARY KEY (`city_id`),
UNIQUE KEY `uiname` (`city`, `state`, `country`)
);

-- Previous residences for belknapj
INSERT INTO `CityLocations` (`city`, `state`, `country`) VALUES
('Denton', 'TX', 'US')
,('Monticello', 'AR', 'US')
,('Pine Bluff', 'AR', 'US')
,('San Antonio', 'TX', 'US')
;

SELECT * FROM CityLocations;

-- Create UserCityLocations table (connects user with city)
SELECT 'Creating UserCityLocations table' as '';

CREATE TABLE `UserCityLocations` (
`user_id` int(11) NOT NULL,
`city_id` int(11) NOT NULL,
PRIMARY KEY (`user_id`, `city_id`),
FOREIGN KEY (`user_id`) REFERENCES Users(`user_id`) ON DELETE NO ACTION,
FOREIGN KEY (`city_id`) REFERENCES CityLocations(`city_id`) ON DELETE NO ACTION
);

-- Connect belknapj to previous residences
INSERT INTO `UserCityLocations` (`user_id`, `city_id`) VALUES
 ((SELECT user_id FROM Users WHERE username = 'belknapj'),
  (SELECT city_id FROM CityLocations 
   WHERE city = 'Denton'
   AND state = 'TX'
   AND country = 'US'  
 ))
,((SELECT user_id FROM Users WHERE username = 'belknapj'),
 (SELECT city_id FROM CityLocations 
  WHERE city = 'Monticello'
  AND state = 'AR'
  AND country = 'US'  
))
,((SELECT user_id FROM Users WHERE username = 'belknapj'),
 (SELECT city_id FROM CityLocations 
  WHERE city = 'Pine Bluff'
  AND state = 'AR'
  AND country = 'US'  
))
,((SELECT user_id FROM Users WHERE username = 'belknapj'),
 (SELECT city_id FROM CityLocations 
  WHERE city = 'San Antonio'
  AND state = 'TX'
  AND country = 'US'  
))
;

-- Perform selects to test joins
SELECT username, zipcode FROM CodeLocations
INNER JOIN UserCodeLocations 
ON UserCodeLocations.code_id = CodeLocations.code_id
INNER JOIN Users
ON Users.user_id = UserCodeLocations.user_id;

SELECT username, city, state, country FROM CityLocations
INNER JOIN UserCityLocations 
ON UserCityLocations.city_id = CityLocations.city_id
INNER JOIN Users
ON Users.user_id = UserCityLocations.user_id;
