// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initMap()
{

  var input = document.getElementById('input-Autocomplete');
  var autocomplete = new google.maps.places.Autocomplete(input);



autocomplete.addListener('place_changed', function() 
  {
    var placeObject = autocomplete.getPlace();

    var city = ""
    var state = ""
    var country = ""

    console.log(placeObject.address_components);

		for (i = 0; i < placeObject.address_components.length; i++)
    {
  		if (placeObject.address_components[i].types[0] == "locality")
      {
				city = placeObject.address_components[i].short_name
      }

      if (placeObject.address_components[i].types[0] == "country")
      {
				country = placeObject.address_components[i].short_name
      }

      if (placeObject.address_components[i].types[0] == "administrative_area_level_1")
      {
				state = placeObject.address_components[i].short_name
      }
		}


			console.log("corrected format: " + city, state, country)
			input.value=city+","+state+","+country

  });



}
