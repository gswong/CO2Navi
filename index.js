var travelHistory = {};

// on docutment is ready
$(document).ready(function(){
    // Local Storage
    // https://www.w3schools.com/html/html5_webstorage.asp
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        loadFromLocalStorage();
    } else {
        // Sorry! No Web Storage support..
        console.log("Error: can't get Web Storage")
    }
})

function loadFromLocalStorage(){
    travelHistory = JSON.parse(localStorage.getItem("CO2Navi"));
    if (travelHistory==null){
        travelHistory = {};
    }
    console.log("DEBUG: travelHistory: "+JSON.stringify(travelHistory));
}

function saveToLocalStorage(){
    localStorage.setItem("CO2Navi", JSON.stringify(travelHistory));
}


function updateTravelHistory(someInput){
    // update travelHistory
    travelHistory["CO2Navi"]="CO2Navi";     //replace me!

    saveToLocalStorage();
}




//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=


// get current position
var currentPosition;
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(storePosition);
    } else { 
        console.log("Error: Geolocation is not supported by this browser.");
    }
}

function storePosition(position) {
    currentPosition = position;
    console.log("DEBUG: Current Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
}

getLocation();








//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// google maps auto complete

// https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-hotelsearch
var map, places, infoWindow;
var markers = [];
var autocomplete;
var directionsService;

function initMap() {
    directionsService = new google.maps.DirectionsService;
    // Create the autocomplete object and associate it with the UI input control.
    // Restrict the search to the default country, and to place type "cities".
    autocomplete = new google.maps.places.Autocomplete(
        /* @type {!HTMLInputElement} */ (
            document.getElementById('autocomplete')), {});
    //autocomplete.addListener('place_changed', onPlaceChanged);
}

/*  // Kyle: nope, we don't need that, but just incase
    // When the user selects a city, get the place details for the city and
    // zoom the map in on the city.
    function onPlaceChanged() {
        var destinationPlace = autocomplete.getPlace();
        if (destinationPlace.address_components[0]) {
            // https://developers.google.com/maps/documentation/javascript/directions#TravelModes
            calculateAndDisplayRoute(directionsService, destinationPlace.address_components[0].long_name, 'TRANSIT');
            //DRIVING (Default) indicates standard driving directions using the road network.
            //BICYCLING requests bicycling directions via bicycle paths & preferred streets.
            //TRANSIT requests directions via public transit routes.
            //WALKING requests walking directions via pedestrian paths & sidewalks.
        } else {
            document.getElementById('autocomplete').placeholder = 'Enter a city';
        }

*/





//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//google maps direction
var numberOfRespondRecived=0;
var googleDirectionRespond={};

function calculateAndDisplayRoute(directionsService, destinationName, travelMode) {
    directionsService.route({
        origin: currentPosition.coords.latitude + ", " + currentPosition.coords.longitude,
        destination: destinationName,
        travelMode: travelMode //'DRIVING' 
    }, function(response, status) {
        if (status === 'OK') {
            
            var googleMapUrl = "https://www.google.com/maps?daddr="+destinationName.replace(/ /g, "+")+"&dirflg=";
            //* w: walking
            //* b: bicycling
            //* d or h or t: drive
            //* r: public transit

            switch (travelMode) {
                case 'DRIVING':
                    googleMapUrl += 'd';
                    break;
                case 'BICYCLING':
                    googleMapUrl += 'b';
                    break;
                case 'TRANSIT':
                    googleMapUrl += 'r';
                    break;
                case 'WALKING':
                    googleMapUrl += 'w';
                    break;
            }
            var distance = response.routes[0].legs[0].distance.value;
            var duration = response.routes[0].legs[0].duration.text;
            
            // weird bug, the string disappear if I pass it into the function :/
            googleDirectionRespond[travelMode] = {
                "distance": distance,
                "duration": duration,
                "googleMapUrl": googleMapUrl
            }
            getDirectionRespond();
        } else {
            googleDirectionRespond[travelMode] = {
                "distance": "0",
                "duration": "---",
                "googleMapUrl": "#"
            }
            getDirectionRespond();
            console.log('ERROR: Directions request failed due to ' + status);
        }
    });
}



function getDirectionFromGoogle(){
    numberOfRespondRecived=0;
    googleDirectionRespond={};
    var desString = document.getElementById("autocomplete").value;
    calculateAndDisplayRoute(directionsService, desString, 'DRIVING');
    calculateAndDisplayRoute(directionsService, desString, 'BICYCLING');
    calculateAndDisplayRoute(directionsService, desString, 'TRANSIT');
    calculateAndDisplayRoute(directionsService, desString, 'WALKING');
    //DRIVING (Default) indicates standard driving directions using the road network.
    //BICYCLING requests bicycling directions via bicycle paths & preferred streets.
    //TRANSIT requests directions via public transit routes.
    //WALKING requests walking directions via pedestrian paths & sidewalks.
}


function getDirectionRespond(distance, duration, googleMapUrl, travelMode){
    
    numberOfRespondRecived++;
    if (numberOfRespondRecived>=4){ //get all respond
        gotAllRespond();
    }
}

function gotAllRespond(){
    console.log("DEBUG: "+ JSON.stringify(googleDirectionRespond));

    var order = [ 'DRIVING', 'TRANSIT', 'BICYCLING', 'WALKING' ];


    for (var i =0; i<4; i++){
        var currentMode = order[i];

        var ul=document.getElementById("tp");
        var myList = '<li><a href="'+googleDirectionRespond[currentMode].googleMapUrl+'">';
        myList += '<h2>'+currentMode+'</h2>';
        myList+='<p>Distance: '+googleDirectionRespond[currentMode].distance+'    ';
        myList+="CO2: "+'</p>';
        myList+='<p class="ui-li-aside"><strong>'+googleDirectionRespond[currentMode].duration+'</strong></p>';
        myList+='</a></li>';
        ul.innerHTML+=myList;
        console.log(ul);

        $('#tp').listview('refresh');
    }



}
