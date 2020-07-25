Pages:
- Login (static html)
  - Signup (static html)
  - Weather (handlebars template page)
    - Admin Settings (static html + js)
    - Locations (static html + js)


Frontend Functions:
- register user
  - send name and email to backend
- authenticate user
  - send credentials to backend
- toggle metric / imperial units
- send changed admin settings to backend
- parse location type
  - send location to backend
- input validation
  - input validation on signup page
  - input validation on locations page
  - input validation on admin settings page
- get weather
  - send post request to backend with array of addresses or zips for locations

Backend Functions:
- create user
  - interpret data received from reg form
  - send create query to DB
- add location
  - interpret data received from loc. page
  - send create request to location DB
- remove location
  - interpret data received from loc. page
  - send delete request to location DB
- change max number of locations

Express Routes:
- "/"
- "/register"
- "/weather"
- "/settings"
- "/locations"

- "/delUser"
  - POST request with required data
- "/addUser"
  - POST request with required data
- "/delLocationByZip"
  - POST request with required data
- "/delLocationByAddress"
  - POST request with required data
- "/addLocation"
  - POST request with required data
- "/changeLocMaxNum"
  - POST request with required data
- "/getWeather"
  - POST request with array of all data
