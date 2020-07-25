Temporary Installation steps:

# Start VPN to access OSU web page (like you've done in previous classes)
log in to OSU flip server
# clone repository from github or pull latest
git clone https://github.com/QuantumObstruction/Expanse .
or 
git pull
# switch to the belknap branch
git checkout belknap
# go to the sql folder
cd sql
# run the following commands to restore the database to
# its initial state (this will affect everyone using the
# database, but at this point, that's only me (James))
mysql -u cs361_belknapj -h classmysql.engr.oregonstate.edu -p
enter password: expanse
source weatherapp_db_create.sql
# If there are any errors, then we need to debug the problem.
# Otherwise, return to regular linux prompt
exit
# go to the WeatherApp folder
cd ../WeatherApp
# install packages needed to run app
npm install
npm install request
# change the port number in weatherApp.js if you need to
# then start the app
node weatherApp.js
# you should be able to access the login page at (assuming you are 
# using port 54322):
https://flip.engr.oregonstate.edu:54322



This is my proposal for structuring the software 
to make it easier to divide up the work for the team.

I am assuming we will be using handlebars as 
used in the Web Development and Database classes.
This is the only way I know to handle the dynamic
nature of formatting the web pages.

The dbcon.js can be set up so you don't have to have
an active database (although I have tested the code
in the db subfolder to ensure the queries work so far).
There is a flag at the top of weatherApp.js to run
in database emulation mode and it provides some
representative data that matches what we might see
from the database. You can edit these hard-coded locations
in retrieveLocations.js for your testing purposes.

Here's roughly what I had in mind with respect to
the folder structure:

public - css stuff goes here. This would probably
         be used by the person handling the HTML
         (handlebars files). Alima, maybe?
         Input validation of the HTML (handlebars)
         files is also handled here to reduce the
         types of errors we have to worry about on
         the backend.
weatherapi - the files in this folder are 
             responsible for taking the location
             data passed by db code to retrieve
             the weather data from OpenWeatherApi
             and pass it all along to the 
             handlebars files.
views - these are the handlebars files. We need
        to make these match the templates that
        Alima has created for us.
routes - these are the basic route handlers for 
         the posts and gets, but I would prefer
         to move the business logic out of these
         files and into the other folders to
         break up the files and make it easier
         for each team member to edit a given file
         with less risk of conflicts between team
         members working on the same file.
db - all database access would be handled in the
     files in this folder.
         
My goal here is to start pulling together all
the stuff we've been doing separatly and putting
it together in a single project we can all work on
without trampling on each other.
     
Look it over and let me know what you think.     
