import { slideToggle } from "../../js/libs/helpers";
import { rangeDoubleTweaker } from "../../js/libs/rangeDoubleTweaker";

(() => {
	const filters = document.querySelectorAll('.filter');

	if (! filters.length) return;

	filters.forEach((filter) => {
		filter.querySelector('.filter__title').addEventListener('click', (e) => {
			filter.classList.toggle('opened', slideToggle(filter.querySelector('.filter__body')));

			/* slideToggle(filter.querySelector('.filter__body'), {
				callback: () => filter.classList.toggle('opened')
			}); */
		});

		filter.querySelector('.filter__range')
		rangeDoubleTweaker(filter.querySelector('.filter__range'), {
			maxPrice: 10000,
			startMin: 2500,
			startMax: 7500,
			input: false,
			step: 100,
			gap: 1000
		});
	});

})();
