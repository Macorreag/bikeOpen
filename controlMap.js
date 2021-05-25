import { loadJSON } from './js/jsonManage.js'
const BIKEPATH = "./data/Ciclorruta.geojson";
const ROBOS = "https://script.google.com/macros/s/AKfycbzsm2ZGUz8bqXkdHCn2AqP9dVzHPrkealIYMhTeJpgOhqsY0B2pBDdBRRLaFEte3aQ5xA/exec"

var map = L.map("map").setView([4.59808, -74.0760439], 13);

//migrate to module
// function loadJSON(path, success, error) {
// 	var xhr = new XMLHttpRequest();
// 	xhr.onreadystatechange = function () {
// 		if (xhr.readyState === XMLHttpRequest.DONE) {
// 			if (xhr.status === 200) {
// 				if (success) success(JSON.parse(xhr.responseText));
// 			} else {
// 				if (error) error(xhr);
// 			}
// 		}
// 	};
// 	xhr.open("GET", path, true);
// 	xhr.send();
// }

L.tileLayer(
    "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=31e5cca6ebd249ce9c40dc5dd7aecd10",
    {
        /*Atribution is editable*/
        attribution:
            'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18,
    }
).addTo(map);

L.control.scale().addTo(map);

var geocodeService = L.esri.Geocoding.geocodeService({
    apikey: config.ARC_GIS,
});

var marker = L.marker([4.59808, -74.0760439], {
    draggable: true,
})
    .addTo(map)
    .bindPopup("¡Muevemé!")
    .openPopup();

var direction = null;

marker.on("dragend", function (e) {
    geocodeService
        .reverse()
        .latlng([marker.getLatLng().lat, marker.getLatLng().lng])
        .run(function (error, result) {
            if (error) {
                return;
            }

            direction = result.address.Match_addr;
            marker.bindPopup(direction).openPopup();
        });

    // Send data marker to the parent node on drag the marker
    const message = JSON.stringify({
        latitude: e.target._latlng.lat,
        longitude: e.target._latlng.lng,
    });
    console.log(e.target._latlng)
    window.parent.postMessage(message, "*");
});

loadJSON(
    BIKEPATH,
    function (data) {
        console.log(data);
        L.geoJSON(data, {})
            .bindPopup(function (layer) {
                return layer.feature.properties.description;
            })
            .addTo(map);
    },
    function (xhr) {
        console.error(xhr);
    }
);

	// loadJSON(
			// 	ROBOS,
			// 	function (data) {
			// 		console.log(data);
			// 		L.geoJSON(data, {})
			// 			.bindPopup(function (layer) {
			// 				return layer.feature.properties.description;
			// 			})
			// 			.addTo(map);
			// 	},
			// 	function (xhr) {
			// 		console.error(xhr);
			// 	}
			// );
