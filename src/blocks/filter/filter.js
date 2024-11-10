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

		rangeDoubleTweaker(filter.querySelector('.filter__range'), { input: true });
	});

})();