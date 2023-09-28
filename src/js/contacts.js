function initMap() {
  var uluru = { lat: 59.935727, lng: 30.329806 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: uluru,
  });

  var image = "img/icons/map-marker.svg";

  // var marker = new google.maps.Marker({
  //     position: uluru,
  //     map: map,
  //     icon: image
  // });

  var locations = [
    { lat: 59.945378, lng: 30.280247 },
    { lat: 59.981014, lng: 30.427167 },
    { lat: 59.868629, lng: 30.378644 },
    { lat: 59.86057, lng: 30.274899 },
  ];

  var markers = locations.map(function (location, i) {
    return new google.maps.Marker({
      position: location,
      label: "",
      icon: image,
    });
  });

  var markerCluster = new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });
}
