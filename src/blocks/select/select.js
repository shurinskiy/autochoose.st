import { selectTweaker } from "../../js/libs/selectTweaker";

(() => {
	const selects = document.querySelectorAll('select.field__box');
	
	selectTweaker(selects, {
		select: function () { this.querySelector('.select__head').classList.add('selected') }
	});

})();