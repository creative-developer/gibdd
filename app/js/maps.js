var myMap;
var popupMap;
var fineMap;
function mapControls(map){
	map.geoObjects.add(myPlacemark);
	map.behaviors.disable('multiTouch').disable('scrollZoom');
	map.controls.remove('searchControl').remove('routeEditor').remove('trafficControl').remove('typeSelector');
}

function init() {
	myMap = new ymaps.Map(
		'map',
		{
			center: [ 55.707769, 37.836000 ],
			zoom: 14,
			controls: ["default","routeEditor"],
			type: 'yandex#map',
		},
		{
			searchControlProvider: 'yandex#search'
		});

		myPlacemark = new ymaps.Placemark([ 55.709500, 37.833650 ], {
			hintContent: '',
			balloonContent: ''
		},
		{
			iconLayout: 'default#image',
			iconImageHref: 'img/icons/map-baloon.svg',
			iconImageSize: [66, 66],
			iconImageOffset: [-5, -38]
		});
		

mapControls(myMap)
}

function initPopupMap() {
	popupMap = new ymaps.Map(
		'popup-map',
		{
			center: [ 55.707769, 37.836000 ],
			zoom: 14,
			controls: ["default", "routeEditor"],
			type: 'yandex#map',
		},
		{
			searchControlProvider: 'yandex#search'
		});

		myPlacemark = new ymaps.Placemark([ 55.709500, 37.833650 ], {
			hintContent: '',
			balloonContent: ''
		},
		{
			iconLayout: 'default#image',
			iconImageHref: 'img/icons/pin.svg',
			iconImageSize: [66, 66],
			iconImageOffset: [-5, -38]
		});
	mapControls(popupMap)
}

function initFineMap() {
	fineMap = new ymaps.Map(
		'fineMap1',
		{
			center: [ 55.707769, 37.836000 ],
			zoom: 14,
			controls: ["default", "routeEditor"],
			type: 'yandex#map',
		},
		{
			searchControlProvider: 'yandex#search'
		});

		myPlacemark = new ymaps.Placemark([ 55.709500, 37.833650 ], {
			hintContent: '',
			balloonContent: ''
		},
		{
			iconLayout: 'default#image',
			iconImageHref: 'img/icons/pin.svg',
			iconImageSize: [66, 66],
			iconImageOffset: [-5, -38]
		});
	mapControls(fineMap)
}

function initAddressMap() {
	addresMap = new ymaps.Map(
		'address-map',
		{
			center: [ 55.707769, 37.836000 ],
			zoom: 14,
			controls: ["default", "routeEditor"],
			type: 'yandex#map',
		},
		{
			searchControlProvider: 'yandex#search'
		});

		myPlacemark = new ymaps.Placemark([ 55.709500, 37.833650 ], {
			hintContent: '',
			balloonContent: ''
		},
		{
			iconLayout: 'default#image',
			iconImageHref: 'img/icons/pin.svg',
			iconImageSize: [66, 66],
			iconImageOffset: [-5, -38]
		});
	mapControls(addresMap)
}

function mapRequest(element, fn) {
	var flag = true;
	var elementOffset = element.offset().top
	$(window).on('scroll', function(e) {
		if ($(window).scrollTop() >= elementOffset && flag) {
			$.ajax({
				url: '//api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=',
				dataType: "script",
			}).done(function(){
				ymaps.ready(fn);
			});
			flag = false;
		}
	})
}

if($('.news').length) mapRequest($('.news'), init);
if($('.fine').length) mapRequest($('.fine'), initFineMap);
if($('.contacts__row').length) mapRequest($('.contacts__row'), initAddressMap);