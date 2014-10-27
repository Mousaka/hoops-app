    		$(document).ready(function() {
    var mapCenter = new google.maps.LatLng(47.6145, -122.3418); //Google map Coordinates
    var map;
    var infowindow;
    var markers = new Array();
    var infoWindows = new Array();
    var currentLocation = geolocation.getCurrentPosition();
    map_initialize(); // load map
    function map_initialize(){
       
        //Google map option
        var googleMapOptions =
        {
            center: mapCenter, // map center
            zoom: 17, //zoom level, 0 = earth view to higher value
            panControl: true, //enable pan Control
            zoomControl: true, //enable zoom control
            disableDoubleClickZoom: true,
            zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL //zoom control size
        },
            scaleControl: true, // enable scale control
            mapTypeId: google.maps.MapTypeId.ROADMAP // google map type
        };
       
        map = new google.maps.Map(document.getElementById("map-canvas"), googleMapOptions);

        //##### drop a new marker on double click ######
        google.maps.event.addListener(map, 'dblclick', function(event) {
          if(infowindow){
              infowindow.close();
            }
        var marker = new google.maps.Marker({
            position: event.latLng, //map Coordinates where user right clicked
            map: map,
            draggable:true, //set marker draggable
            animation: google.maps.Animation.DROP, //bounce animation
            title:"Hello World!",
            icon: "images/low/pinlogo.png" //custom pin icon
        });
                //Content structure of info Window for the Markers
        var contentString = $('<div class="marker-info-win">'+
        '<div class="marker-inner-win"><span class="info-content">'+
        '<h1 class="marker-heading">New Marker</h1>'+
        'This is a new marker infoWindow'+
        '</span>'+
        '</div></div>');
           
        //Create an infoWindow
        infowindow = new google.maps.InfoWindow();
        //set the content of infoWindow
        infowindow.setContent(contentString[0]);
        //add click event listener to marker which will open infoWindow          
        google.maps.event.addListener(marker, 'click', function() {
            if(infowindow){
              infowindow.close();
            }
            infowindow.open(map,marker); // click on marker opens info window
            map.panTo(marker.getPosition());
            bounce3sec();
        });
        markers.push(marker); //adding marker to array
        infoWindows.push(infowindow); //adding infoWindow.

        function bounce3sec() { //Makes marker bounce 3 sec
          if (marker.getAnimation() != null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
              marker.setAnimation(null)
            }, 3000);
          }
        }
    });
    }
});