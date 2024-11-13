import { slideToggle } from "../../js/libs/helpers";
import { rangeDoubleTweaker } from "../../js/libs/rangeDoubleTweaker";

(() => {
	const filters = document.querySelectorAll('.filter');
	let storage = JSON.parse(localStorage.getItem('filters')) || [];
	
	const addToLocalStorageArray = (newItem, add = true) => {
		if (add) {
			storage.push(newItem);
		} else {
			storage = storage.filter((value) => value != newItem);
		}

		localStorage.setItem('filters', JSON.stringify(storage));
	}

	if (! filters.length) return;

	filters.forEach((filter) => {
		filter.classList.toggle('opened', storage.includes(filter.id));

		filter.querySelector('.filter__title').addEventListener('click', (e) => {
			if (slideToggle(filter.querySelector('.filter__body'))) {
				filter.classList.add('opened');
				if (filter.id) addToLocalStorageArray(filter.id);
			} else {
				filter.classList.remove('opened');
				if (filter.id) addToLocalStorageArray(filter.id, false);
			}
		});

		rangeDoubleTweaker(filter.querySelector('.filter__range'), { input: true });
	});

})();