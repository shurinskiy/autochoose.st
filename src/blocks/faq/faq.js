import { smoothAccordion } from "../../js/libs/accordions";

(() => {
	smoothAccordion(document.querySelectorAll('.faq__items .faq__question'), { 
		toggle: true,
		duration: 300
	});

})();
