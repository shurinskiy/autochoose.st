export const stickySidebar = (items, options = {}) => {
	class Sidebar {
		constructor(aside, options) {
			if(! aside) return;

			// сайдбар
			this.aside = aside;
			// текущая позиция скролла для определения направления проскролливания
			this.currPos = window.scrollY;
			// смотрим в актуальные стили сайдбара
			this.styles = window.getComputedStyle(aside);
			// отступ для фиксации верха, берем из стилей
			this.startScroll = parseInt(this.styles.top, 10);
			// высота странички с учетом заданного отступа для фиксации верха
			this.availableHeightTop = window.innerHeight - this.startScroll;
			// высота странички с учетом заданного отступа для фиксации низа
			this.availableHeightBottom = window.innerHeight - parseInt(this.styles.bottom, 10);
			// устанавливаем верхнее начальное положение при инициализации
			this.aside.style.top = this.startScroll + 'px';

			this.options = {
				sensitivity: 0,
				...options
			}

			this.#init();
		}

		#asideScroll() {
			if(this.styles.position !== 'sticky') return;
			
			if (this.aside.offsetHeight <= this.availableHeightTop) {
				this.aside.style.top = this.startScroll + 'px';
				return;
			}
			
			const currentTop = parseInt(this.aside.style.top, 10);
			const endScroll = this.availableHeightBottom - this.aside.offsetHeight
			
			if (this.aside.offsetHeight > this.availableHeightTop) {
				if (window.scrollY < this.currPos) {
					if (currentTop < this.startScroll) {
						this.aside.style.top = (currentTop + this.currPos - window.scrollY) + 'px';
					} else if (currentTop >= this.startScroll && currentTop !== this.startScroll) {
						this.aside.style.top = this.startScroll + 'px';
					}
				} else {
					if (currentTop > endScroll) {
						this.aside.style.top = (currentTop + this.currPos - window.scrollY) + 'px';
					} else if (currentTop < (endScroll) && currentTop !== endScroll) {
						this.aside.style.top = endScroll + 'px';
					}
				}
			}
			this.currPos = window.scrollY;
		}
		
		#throttle(fn) {
			let timeout = null;
		
			return (...args) => {
				if (timeout === null) {
					
					timeout = setTimeout(() => {
						fn.apply(this, args);
						timeout = null;
					}, options.sensitivity)
				}
			}
		}

		#init() {
			window.addEventListener('scroll', this.#asideScroll.bind(this), { capture: true, passive: true });
			window.addEventListener('resize', this.#throttle(() => {
				const { top } = this.aside.style;

				this.aside.removeAttribute('style');
				this.styles = window.getComputedStyle(this.aside);
				this.startScroll = parseInt(this.styles.top, 10);
				this.availableHeightTop = window.innerHeight - this.startScroll;
				this.availableHeightBottom = window.innerHeight - parseInt(this.styles.bottom, 10);
				this.aside.style.top = top;
				this.#asideScroll();
			}));

			this.#asideScroll();
		}
	}

	if(items instanceof NodeList) {
		items.forEach((item) => new Sidebar(item, options));
	} else {
		return new Sidebar(items, options);
	}
}