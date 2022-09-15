mapboxgl.accessToken = 'pk.eyJ1Ijoia2VubmV0aGVsdW1iYSIsImEiOiJjbDgwYTJ6dzAwNDgyM29yejBnZmloeW1zIn0.GYoCqk09F5HzCvcX9VQFag'
// 

const latitude = document.getElementById('latitude')
const longitude = document.getElementById('longitude')
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v11', // style URL satellite style: 'mapbox://styles/mapbox/satellite-streets-v11'
	center: [13.404954, 52.520008], // starting position [lng, lat]
	zoom: 9, // starting zoom
	projection: 'globe' // display the map as a 3D globe
});

const nav = new mapboxgl.NavigationControl()
map.addControl(nav, 'top-left')

map.addControl(new mapboxgl.FullscreenControl());

const marker = new mapboxgl.Marker({
	color: '#FA8E24',
	draggable: true
})	.setLngLat([13.3711224, 52.5063688])
	.addTo(map)

	function onDragEnd() {
		const lngLat = marker.getLngLat();
		latitude.value = `${lngLat.lng}`;
		longitude.value = `${lngLat.lat}`
	}
	
	marker.on('dragend', onDragEnd);
	






































	
// map.on('load', () => {
// 		// Load an image from an external URL.
// 	map.loadImage(
// 		'https://res.cloudinary.com/dpr313h3q/image/upload/v1663243646/nomad-graffiti-project/hkyqk6dmeapdvh7mepph.jpg',
// 		(error, image) => {
// 			if (error) throw error;
		 
// 			// Add the image to the map style.
// 			map.addImage('marker', image);
		 
// 			// Add a data source containing one point feature.
// 			map.addSource('point', {
// 				'type': 'geojson',
// 				'data': {
// 					'type': 'FeatureCollection',
// 					'features': [
// 						{
// 							// feature for image one
// 							'type': 'Feature',
// 							'geometry': {
// 								'type': 'Point',
// 								'coordinates': [13.404954, 52.520008]
// 							},
// 							'properties': {
// 								'title': 'first image',
// 							}
// 						},
// 						// {
// 						// 	// feature for second image d
// 						// 	'type': 'Feature',
// 						// 	'geometry': {
// 						// 	'type': 'Point',
// 						// 	'coordinates': [13.406636415414056, 52.52752519522963]
// 						// 	},
// 						// 	'properties': {
// 						// 	'title': 'second image'
// 						// 	}
// 						// }
// 					]
// 				}
// 			});
		 
// 			// Add a layer to use the image to represent the data.
// 			map.addLayer({
// 				'id': 'points',
// 				'type': 'symbol',
// 				'source': 'point', // reference the data source
// 				'layout': {
// 					'icon-image': 'cat', // reference the image
// 					'icon-size': 0.25
// 				}
// 			});
// 	   	}
// 	);
// });
	


///////////// setting a pop up
const popup = new mapboxgl.Popup({
	closesButton: true
})
	
// popup.setLngLat([13.453281, 52.5329816])
// 	.setHTML('<h1>Hello World</h1>')
// 	.addTo(map)

  // const coords = [
// 	[13.405, 52.52],
// 	[13.6, 52.6]
// ]

// coords.forEach(coord => {
// 	new mapboxgl.Marker({
// 		color: 'green'
// 	}).setLngLat(coord)
// 		.addTo(map)
// })

//////////// this positions a marker on the map on click

// function addMarker(event) {
// 	new mapboxgl.Marker({
// 		color: 'red',
// }).setLngLat(event.lngLat)
// 		.addTo(map)
// }
// map.on('click', addMarker)

