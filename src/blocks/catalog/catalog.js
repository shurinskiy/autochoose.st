import scrollLock from 'scroll-lock';
import { menuToggle } from "../../js/libs/menuToggle";
import { stickySidebar } from "../../js/libs/stickySidebar";

(() => {
	const aside = document.querySelector('.catalog__aside');
	if(!aside) return;
	
	
	const toggles = document.querySelectorAll('button.catalog__aside-toggle, button.catalog__aside-close');
	
	const sidebar = menuToggle(aside, toggles, {
		omitToClose: '.modal',
		class: 'opened',
		open: function() {
			const maxw = parseInt(getComputedStyle(this).maxWidth);
			const scrollw = scrollLock.getPageScrollBarWidth();
			
			Object.assign(this.style, { maxWidth: maxw + scrollw + 'px' });
			scrollLock.disablePageScroll();
			document.body.classList.add('underlay');
		},
		close: function() {
			scrollLock.clearQueueScrollLocks();
			scrollLock.enablePageScroll();
			document.body.classList.add('underlay_closing');
			
			this.addEventListener('transitionend', e => {
				document.body.classList.remove('underlay','underlay_closing');
			}, { once: true });
		}
	});
	
	// открытие и закрытие меню, свайпом на мобильных устройствах
	aside.addEventListener('swiped-right', (e) => sidebar.menuClose(e));
	// чтобы не перекрывались с главным меню
	document.querySelector('button.header__toggle')?.addEventListener('click', (e) => sidebar.menuClose(e, false));
	// прокрутка с прилипанием для всего сайдбара на больших размерах экрана
	stickySidebar(aside.querySelector('.catalog__filters'));

})();