-- AT4-1: Can we insert users?

-- Append everything into given output file
TEE at4_results.txt

-- Insert user, accepting defaults
INSERT INTO Users
(`username`,`password`)
VALUES ('noahbody', 'topsecret');

-- AT4-2: Can we retrieve user entries?

-- Verify we can retrieve user 'noahbody'
SELECT 'Verify noahbody is present with defaults in following query' as '';
SELECT * FROM Users WHERE `username` = 'noahbody';

-- AT4-3: Can we remove users?
DELETE FROM Users WHERE `username` = 'noahbody';
SELECT 'Verify noahbody is absent in following query' as '';
SELECT * FROM Users WHERE `username` = 'noahbody';

-- Insert user, providing email address
INSERT INTO Users
(`username`,`password`,`email_addr`)
VALUES ('noahbody', 'topsecret','noahbody@oregonstate.edu');

-- AT4-2: Can we retrieve user entries?

-- Verify we can retrieve user 'noahbody'
SELECT 'Verify noahbody is present with email address in following query' as '';
SELECT * FROM Users WHERE `username` = 'noahbody';

-- AT4-3: Can we remove users?
DELETE FROM Users WHERE `username` = 'noahbody';
SELECT 'Verify noahbody is absent in following query' as '';
SELECT * FROM Users WHERE `username` = 'noahbody';

-- Insert user, providing admin privileges
INSERT INTO Users
(`username`,`password`,`email_addr`,`admin_flag`)
VALUES ('noahbody', 'topsecret','noahbody@oregonstate.edu',true);

-- AT4-2: Can we retrieve user entries?

-- Verify we can retrieve user 'noahbody'
SELECT 'Verify noahbody is present with admin privileges in following query' as '';
SELECT * FROM Users WHERE `username` = 'noahbody';

-- AT4-3: Can we remove users?
DELETE FROM Users WHERE `username` = 'noahbody';
SELECT 'Verify noahbody is absent in following query' as '';
SELECT * FROM Users WHERE `username` = 'noahbody';

-- Insert user, changing maximum locations allowed for user
INSERT INTO Users
(`username`,`password`,`email_addr`,`max_locs`,`admin_flag`)
VALUES ('noahbody', 'topsecret','noahbody@oregonstate.edu',10,true);

-- AT4-2: Can we retrieve user entries?

-- Verify we can retrieve user 'noahbody'
SELECT 'Verify noahbody is present with 10 max locations in the following query' as '';
SELECT * FROM Users WHERE `username` = 'noahbody';

-- AT4-3: Can we remove users?
DELETE FROM Users WHERE `username` = 'noahbody';
SELECT 'Verify noahbody is absent in following query' as '';
SELECT * FROM Users WHERE `username` = 'noahbody';


-- Insert user, accepting defaults
INSERT INTO Users
(`username`,`password`)
VALUES ('noahbody', 'topsecret');

SELECT 'Verify noahbody is present with defaults in following query' as '';
SELECT * FROM Users WHERE `username` = 'noahbody';

UPDATE Users SET
password='notsecret'
WHERE username='noahbody';

SELECT 'Verify password is notsecret in following query' as '';
SELECT * FROM Users WHERE `username` = 'noahbody';

UPDATE Users SET
email_addr='noahbody@oregonstate.edu'
WHERE username='noahbody';

SELECT 'Verify email address is present in following query' as '';
SELECT * FROM Users WHERE `username` = 'noahbody';

UPDATE Users SET
admin_flag=true
WHERE username='noahbody';

SELECT 'Verify admin flag is set in following query' as '';
SELECT * FROM Users WHERE `username` = 'noahbody';

UPDATE Users SET
max_locs=15
WHERE username='noahbody';

SELECT 'Verify max location is 15 in following query' as '';
SELECT * FROM Users WHERE `username` = 'noahbody';

DELETE FROM Users WHERE `username` = 'noahbody';
SELECT 'Verify noahbody is absent in following query' as '';
SELECT * FROM Users WHERE `username` = 'noahbody';

-- Don't write to the output file
NOTEE
