import ymaps from 'ymaps';

(() => {
	let footer_map = document.querySelector('.contacts__map');

	ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU').then(maps => {

		const map = new maps.Map(footer_map, {
			center: [53.908389, 27.454249],
			zoom: 16,
			controls: [],
		},{
			zoomControlPosition: { right: '5%', top: 100 },
			zoomControlFloat: 'none',
			searchControlProvider: 'yandex#search'
		});

		const zoomControl = new maps.control.ZoomControl({
			options: {
				size: 'small',
				float: 'none',
				position: { bottom: 10, right: 10 }
			}
		});

		const fullscreenControl = new maps.control.FullscreenControl({
			options: {
				position: { top: 10, right: 10 }
			}
		});		

		const myPlacemark = new maps.Placemark([53.908389, 27.454249], {
			balloonContentHeader: "Салон продажи автомобилей",
			balloonContentBody: "г. Минск, ул Лещинского, д. 4",
			balloonContentFooter: "тел: +375 39 357 55 35",
			hintContent: "Салон продажи автомобилей"
		}, {
			preset: 'islands#blueGovernmentIcon'
		});

		map.controls.add(zoomControl);
		map.controls.add(fullscreenControl);
		map.behaviors.disable('scrollZoom');
		map.geoObjects.add(myPlacemark);

	})
	.catch(error => console.log('Failed to load Yandex Maps', error));

})();