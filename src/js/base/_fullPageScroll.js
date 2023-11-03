(function() {
	"use strict";

  const body = document.querySelector('body');
  body.style.overflow = 'hidden';

	const pnls = document.querySelectorAll('.section').length;
	let scdir;
  let hold = false;

	function _scrollY(obj) {
		const step = 100;
		const vh = window.innerHeight / 100;
		const vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
    let pan;

		if ((this !== undefined && this.id === 'maincontent') || (obj !== undefined && obj.id === 'maincontent')) {
			pan = this || obj;
		  plength = parseInt(pan.offsetHeight / vh);
		}
		if (pan === undefined) {
			return;
		}
		let plength = plength || parseInt(pan.offsetHeight / vmin);
		let slength = parseInt(pan.style.transform.replace('translateY(', ''));

		if (scdir === 'up' && Math.abs(slength) < (plength - plength / pnls)) {
			slength = slength - step;
		} else if (scdir === 'down' && slength < 0) {
			slength = slength + step;
		} else if (scdir === 'top') {
			slength = 0;
		}
		if (hold === false) {
			hold = true;
			pan.style.transform = 'translateY(' + slength + 'vh)';
			setTimeout(function() {
				hold = false;
			}, 1000);
		}
	}

	function _swipe(obj) {
    let swdir, sX, sY, dX, dY, stT, elT;
    const threshold = 100;
    const slack = 50;
    const alT = 500;

		obj.addEventListener('touchstart', function(e) {
			const tchs = e.changedTouches[0];
			swdir = 'none';
			sX = tchs.pageX;
			sY = tchs.pageY;
			stT = new Date().getTime();
		}, false);

		obj.addEventListener('touchmove', function(e) {
			e.preventDefault();
		}, false);

		obj.addEventListener('touchend', function(e) {
			const tchs = e.changedTouches[0];
			dX = tchs.pageX - sX;
			dY = tchs.pageY - sY;
			elT = new Date().getTime() - stT;

			if (elT <= alT) {
				if (Math.abs(dX) >= threshold && Math.abs(dY) <= slack) {
					swdir = (dX < 0) ? 'left' : 'right';
				} else if (Math.abs(dY) >= threshold && Math.abs(dX) <= slack) {
					swdir = (dY < 0) ? 'up' : 'down';
				}

				if (obj.id === 'maincontent') {
					if (swdir === 'up') {
						scdir = swdir;
						_scrollY(obj);
					} else if (swdir === 'down' && obj.style.transform !== 'translateY(0)') {
						scdir = swdir;
						_scrollY(obj);
					}
					e.stopPropagation();
				}
			}
		}, false);
	}

	const maincontent = document.getElementById('maincontent');
	maincontent.style.transform = 'translateY(0)';

	maincontent.addEventListener('wheel', function(e) {
    e.preventDefault()
		if (e.deltaY < 0) {
			scdir = 'down';
		}
		if (e.deltaY > 0) {
			scdir = 'up';
		}
		e.stopPropagation();
	});

	maincontent.addEventListener('wheel', _scrollY);
	_swipe(maincontent);
	const tops = document.querySelectorAll('.top');
	for (var i = 0; i < tops.length; i++) {
		tops[i].addEventListener('click', function() {
			scdir = 'top';
			_scrollY(maincontent);
		});
	}
})();
