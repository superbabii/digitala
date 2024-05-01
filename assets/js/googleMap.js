// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
	var mapOptions = {
		zoom: 14,
		center: new google.maps.LatLng(33.4465154, -86.7318209),
	};
	var mapElement = document.getElementById('gmap');

	var map = new google.maps.Map(mapElement, mapOptions);
	
	marker = new google.maps.Marker({
		map:map,
		draggable:true,
		animation: google.maps.Animation.DROP,
		position: new google.maps.LatLng(33.4465154, -86.7318209)
	});
}