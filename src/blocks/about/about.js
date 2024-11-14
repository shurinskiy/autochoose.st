import { Fancybox } from "@fancyapps/ui";

(() => {

	Fancybox.bind(document.querySelector('.about__gallery'), "[data-fancybox]", {
		Thumbs: {
			type: 'classic'
		},
		Toolbar: {
			display: {
				right: ["iterateZoom", "close"],
				left: ["infobar"],
				middle: [],
			},
		},
	});

})();
