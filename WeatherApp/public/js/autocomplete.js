// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function interpritLocation(passedLocationObject, passedFinalLocationObject)
{
  for (i = 0; i < passedLocationObject.address_components.length; i++)
  {

    var processedLocation = {city:"", country:"", state:""};

    if (passedLocationObject.address_components[i].types[0] == "locality")
    {
      console.log("found locality " + passedLocationObject.address_components[i].short_name )
      passedFinalLocationObject.city = passedLocationObject.address_components[i].short_name
    }

    if (passedLocationObject.address_components[i].types[0] == "country")
    {
      passedFinalLocationObject.country = passedLocationObject.address_components[i].short_name
      console.log("found country" +passedLocationObject.address_components[i].short_name)
    }

    if (passedLocationObject.address_components[i].types[0] == "administrative_area_level_1")
    {
      passedFinalLocationObject.state = passedLocationObject.address_components[i].short_name
      console.log("found city " + passedLocationObject.address_components[i].short_name)
    }
  }

  return passedFinalLocationObject
}


function initMap()
{

  var input = document.getElementById('input-Autocomplete');
  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener('place_changed', function()
  {
    var placeObject = autocomplete.getPlace();

    console.log(placeObject.address_components);

    var processedLocation = {city:"", country:"", state:""};
    processedLocation = interpritLocation(placeObject, processedLocation)

    console.log("final: " + processedLocation)

		console.log("corrected format: " + processedLocation.city, processedLocation.state, processedLocation.country)
		input.value=processedLocation.city+","+processedLocation.state+","+processedLocation.country
  });



}
