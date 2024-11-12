export const stickySidebar = (items, options = {}) => {
	class Sidebar {
		constructor(aside, options) {
			if(! aside) return;

			this.aside = aside;
			this.currPos = window.scrollY;
			this.styles = window.getComputedStyle(aside);
			this.startScroll = parseInt(this.styles.top, 10);
			this.endScroll = window.innerHeight - this.aside.offsetHeight - parseInt(this.styles.bottom, 10);
			this.availableHeight = window.innerHeight - this.startScroll;
			this.aside.style.top = this.startScroll + 'px';

			this.options = {
				sensitivity: 0,
				...options
			}

			this.#init();
		}

		#asideScroll() {
			if(this.styles.position !== 'sticky') return;
			
			if (this.aside.offsetHeight <= this.availableHeight) {
				this.aside.style.top = this.startScroll + 'px';
				return;
			}
			
			const asideTop = parseInt(this.aside.style.top, 10);
			
			if (this.aside.offsetHeight > this.availableHeight) {
				if (window.scrollY < this.currPos) {
					if (asideTop < this.startScroll) {
						this.aside.style.top = (asideTop + this.currPos - window.scrollY) + 'px';
					} else if (asideTop >= this.startScroll && asideTop !== this.startScroll) {
						this.aside.style.top = this.startScroll + 'px';
					}
				} else {
					if (asideTop > this.endScroll) {
						this.aside.style.top = (asideTop + this.currPos - window.scrollY) + 'px';
					} else if (asideTop < (this.endScroll) && asideTop !== this.endScroll) {
						this.aside.style.top = this.endScroll + 'px';
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

		reinit() {
			const { top } = this.aside.style;

			this.aside.removeAttribute('style');
			this.styles = window.getComputedStyle(this.aside);
			this.startScroll = parseInt(this.styles.top, 10);
			this.endScroll = window.innerHeight - this.aside.offsetHeight - parseInt(this.styles.bottom, 10);
			this.availableHeight = window.innerHeight - this.startScroll;
			this.aside.style.top = top;
			this.#asideScroll();
		}

		#init() {
			window.addEventListener('scroll', this.#asideScroll.bind(this), { capture: true, passive: true });
			window.addEventListener('resize', this.#throttle(this.reinit.bind(this)));
			this.#asideScroll();
		}
	}

	if(items instanceof NodeList) {
		items.forEach((item) => new Sidebar(item, options));
	} else {
		return new Sidebar(items, options);
	}
}