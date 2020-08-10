// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function interpritLocation(passedLocationObject)
{
  for (i = 0; i < passedLocationObject.address_components.length; i++)
  {

    var processedLocation = {city:"", country:"", state:""};

    if (passedLocationObject.address_components[i].types[0] == "locality")
    {
      processedLocation.city = passedLocationObject.address_components[i].short_name
    }

    if (passedLocationObject.address_components[i].types[0] == "country")
    {
      processedLocation.country = passedLocationObject.address_components[i].short_name
    }

    if (passedLocationObject.address_components[i].types[0] == "administrative_area_level_1")
    {
      processedLocation.state = passedLocationObject.address_components[i].short_name
    }
  }

  return processedLocation
}


function initMap()
{

  var input = document.getElementById('input-Autocomplete');
  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener('place_changed', function()
  {
    var placeObject = autocomplete.getPlace();

    console.log(placeObject.address_components);

    var finalLocation = interpritLocation(placeObject)

		console.log("corrected format: " + finalLocation.city, finalLocation.state, finalLocation.country)
		input.value=finalLocation.city+","+finalLocation.state+","+finalLocation.country
  });



}
