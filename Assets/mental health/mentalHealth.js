let infoWindow;
let infoPanel;

let map;
let bounds;
let service;

// Initialize and draw map based on current location (and also nearby places).
function initMap() {
    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow;
    infoPanel = document.getElementById('panel');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map = new google.maps.Map(document.getElementById('map'), {
                center: pos,
                zoom: 15
            });
            bounds.extend(pos);

            infoWindow.setPosition(pos);
            infoWindow.setContent('You current position:');
            infoWindow.open(map);
            map.setCenter(pos);

            getNearbyPlaces(pos);
        }, () => {
            // error case: do nothing
        });
    }
}

// Search nearby places to given position
function getNearbyPlaces(position) {
    let request = {
        location: position,
        rankBy: google.maps.places.RankBy.DISTANCE,
        keyword: 'mental health'
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}

// Handle nearby places results (up to 20)
function nearbyCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results);
    }
}

// Create markers at each nearby place position on the map
function createMarkers(places) {
    places.forEach(place => {
        let marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name
        });

        google.maps.event.addListener(marker, 'click', () => {
            let request = {
                placeId: place.place_id,
                fields: ['name', 'formatted_address', 'geometry', 'website', 'photos']
            };

            // Only get the place details and information panel when the user clicks on a marker.
            service.getDetails(request, (placeResult, status) => {
                showInfoWindow(placeResult, marker, status)
                showPanel(placeResult);
            });
        });

        bounds.extend(place.geometry.location);
    });
    map.fitBounds(bounds);
}

// Display place info window upon the marker
function showInfoWindow(placeResult, marker, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        let placeInfo = new google.maps.InfoWindow();
        placeInfo.setContent(
            '<div>' +
            '<strong>' + placeResult.name + '</strong><br>' +
            '<p>' + placeResult.formatted_address + '</p>' +
            '</div>');
        placeInfo.open(marker.map, marker);
        infoWindow.close();
        infoWindow = placeInfo;
    }
}

// Displays place information in the panel
function showPanel(placeResult) {
    if (placeResult.photos) {
        let placePhoto = document.getElementById("place_photo");
        placePhoto.src = placeResult.photos[0].getUrl();
        placePhoto.alt = "photo of mental health center"
    } else {
        placePhoto.src = "";
        placePhoto.alt = "This has no photo";
    }

    let placeName = document.getElementById("place_name");
    placeName.innerText = placeResult.name;

    let placeAddress = document.getElementById("place_address");
    placeAddress.innerText = placeResult.formatted_address;

    if (placeResult.website) {
        let placeWebsite = document.getElementById("place_website");
        placeWebsite.innerText = placeResult.website;
        placeWebsite.href = placeResult.website;
    }
}