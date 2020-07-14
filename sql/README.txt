The dbcon.js file contains the information needed to 
connect to the database for the WeatherApp server code.

To exercise the Acceptance Tests in this folder:

1. Copy all the files in this folder to the OSU engineering server.
2. Delete or rename the at4_results.txt and at14_results.txt files.
3. Connect to the db as follows:

mysql -u cs361_belknapj -h classmysql.engr.oregonstate.edu -p

4. Password is 'expanse'
5. From the MariaDB prompt, enter:

source weatherapp_db_create.sql

(This will clear out any existing table data and set up 
the tables in a known clean state.)

6. From the MariaDB prompt, enter:

source at4.sql

(Test results will be created/appended in the at4_results.txt
file of the current directory.)

7. From the MariaDB prompt, enter:

source at14.sql

(Test results will be created/appended in the at14_results.txt
file of the current directory.)

8. Analyze the results files to confirm the queries 
got the expected responses.
