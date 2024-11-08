(() => {
	const search = document.querySelector('.search');

	search.addEventListener('click', (e) => {
		if (window.getComputedStyle(e.currentTarget).position == 'relative')
			e.currentTarget.classList.add('opened');
	});
		
	['click','touchstart'].forEach(event => {
		document.addEventListener(event, e => { 
			if (!search.contains(e.target)) 
				search.classList.remove('opened');
		}, { passive: false });
	});

})();