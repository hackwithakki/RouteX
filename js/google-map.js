
var google;

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    // var myLatlng = new google.maps.LatLng(40.71751, -73.990922);
    var myLatlng = new google.maps.LatLng(24.7935, 84.9823);  // Gaya, Bihar
    
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 15,

        // The latitude and longitude to center the map (always required)
        center: myLatlng,

        // How you would like to style the map. 
        scrollwheel: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            }
        ]
    };

    

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    
    // Add RouteX marker at main location
    var routexLocation = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'RouteX - Premium Car Rental',
        icon: 'images/loc.png'
    });
    
    // Add info window for RouteX
    var infoWindow = new google.maps.InfoWindow({
        content: '<div style="padding: 10px; font-family: Arial;"><strong>RouteX</strong><br>Premium Car Rental Service<br>Gaya, Bihar, India</div>'
    });
    
    routexLocation.addListener('click', function() {
        infoWindow.open(map, routexLocation);
    });
    
    var addresses = ['Gaya, Bihar, India', 'Patna, Bihar, India', 'Bodh Gaya, Bihar, India', 'Rajgir, Bihar, India', 'Nalanda, Bihar, India'];

    for (var x = 0; x < addresses.length; x++) {
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+addresses[x]+'&sensor=false', null, function (data) {
            if (data.results && data.results.length > 0) {
                var p = data.results[0].geometry.location
                var latlng = new google.maps.LatLng(p.lat, p.lng);
                new google.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: 'images/loc.png'
                });
            }
        });
    }
    
}
google.maps.event.addDomListener(window, 'load', init);