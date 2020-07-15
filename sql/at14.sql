-- Append everything into given output file
TEE at14_results.txt

-- Insert user, accepting defaults
INSERT INTO Users
(`username`,`password`)
VALUES ('noahbody', 'topsecret');

-- AT14-1: Can we insert locations?
INSERT INTO CodeLocations
(`zipcode`)
VALUES ('90210');

-- Tie new location to user 'noahbody'
INSERT INTO UserCodeLocations
(`username`,`code_id`)
VALUES ('noahbody',
(SELECT code_id FROM CodeLocations WHERE zipcode='90210')
);

-- AT14-2: Can we retrieve locations?
SELECT 'Verify noahbody is associated with 90210 following query' as '';

SELECT username,zipcode
FROM UserCodeLocations
INNER JOIN CodeLocations
ON UserCodeLocations.code_id = CodeLocations.code_id
WHERE UserCodeLocations.username = 'noahbody';

-- AT14-3: Can we remove locations?
-- Technically, we don't want to remove locations. We just 
-- want to remove their association with a given user.

-- Don't write to the output file
DELETE FROM UserCodeLocations 
WHERE `username` = 'noahbody'
AND `code_id` = 
(SELECT code_id from CodeLocations
WHERE zipcode = '90210')
;

SELECT 'Verify noahbody is NOT associated with 90210 following query' as '';

SELECT username,zipcode
FROM UserCodeLocations
INNER JOIN CodeLocations
ON UserCodeLocations.code_id = CodeLocations.code_id
WHERE UserCodeLocations.username = 'noahbody';

-- AT14-1: Can we insert locations?
-- Insert with default for state and country
INSERT INTO CityLocations
(`city`)
VALUES ('Portland');

-- Insert with specific state
INSERT INTO CityLocations
(`city`,`state`)
VALUES ('Portland','ME');

-- Tie new locations to user 'noahbody'
INSERT INTO UserCityLocations
(`username`,`city_id`)
VALUES ('noahbody',
(SELECT city_id FROM CityLocations WHERE city='Portland' AND state='ME')
);

INSERT INTO UserCityLocations
(`username`,`city_id`)
VALUES ('noahbody',
(SELECT city_id FROM CityLocations WHERE city='Portland' AND state='OR')
);

-- AT4-2: Can we retrieve locations?
SELECT 'Verify noahbody is associated with both Portlands in following query' as '';

SELECT username,city,state,country
FROM UserCityLocations
INNER JOIN CityLocations
ON UserCityLocations.city_id = CityLocations.city_id
WHERE UserCityLocations.username = 'noahbody';

-- AT14-3: Can we remove locations?
-- Technically, we don't want to remove locations. We just 
-- want to remove their association with a given user.

-- Don't write to the output file
DELETE FROM UserCityLocations 
WHERE `username` = 'noahbody'
AND `city_id` = 
(SELECT city_id from CityLocations
WHERE city = 'Portland' AND state = 'OR')
;

DELETE FROM UserCityLocations 
WHERE `username` = 'noahbody'
AND `city_id` = 
(SELECT city_id from CityLocations
WHERE city = 'Portland' AND state = 'ME')
;

SELECT 'Verify noahbody is NOT associated with Portland in following query' as '';

SELECT username,city,state,country
FROM UserCityLocations
INNER JOIN CityLocations
ON UserCityLocations.city_id = CityLocations.city_id
WHERE UserCityLocations.username = 'noahbody';



DELETE FROM Users WHERE `username` = 'noahbody';
NOTEE
