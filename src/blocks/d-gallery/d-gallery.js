import { Fancybox } from "@fancyapps/ui";
import { makeGallery } from "../../js/libs/makeGallery";

(() => {

	makeGallery(document.querySelectorAll('.detail__gallery'), { 
		class: 'showcase',
		render: function() {
			Fancybox.bind(this, "[data-fancybox]", {
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
		}
	});

	
})();
