const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const phone = document.querySelectorAll('.phone')
const prev = document.querySelector('.preview')
const modal = document.querySelector('.modal')
//Slider
const slider = document.querySelector('.offer__slider-wrapper')
const slides = document.querySelectorAll('.offer__slide')
const next = document.querySelector('.offer__slider-next')
const prevS = document.querySelector('.offer__slider-prev')
const numSlide = document.querySelector('#current')
///Timer
const day = document.querySelector('#days')
const hour = document.querySelector('#hours')
const min = document.querySelector('#minutes')
const second = document.querySelector('#seconds')
const promEndTime = document.querySelector('.promotion__time')
const promTitle = document.querySelector('.promotion__title')
const promotionDesc = document.querySelector('.promotion__descr')
//Read More
const readMore = document.querySelector('.arrow')
const offer = document.querySelector('.offer')


class App {
    _evt;
    _curSlide = 0;
    _maxSlide = slides.length
    _untilTime;
    _curTime;

    constructor() {
        phone.forEach(callBtn => callBtn.addEventListener('click', this._contactUs))
        modal.addEventListener('click', this._closeModal)
        prev.addEventListener('click', this._category)
        this._goToSlide(0)
        next.addEventListener('click', this._nextSlide.bind(this))
        prevS.addEventListener('click', this._prevSlide.bind(this))
        this._promTimer()
        readMore.addEventListener('click', this._scrollSection)
    }
    _contactUs() {
        modal.style.display = 'block';
    }
    _closeModal(e) {
        this._evt = e.target
        if (this._evt.classList.contains('modal__close')) {
            modal.style.display = 'none';
        };
        if (this._evt.classList.contains('modal')) {
            modal.style.display = 'none';
        }
    }
    _category(e) {
        const tab = e.target.closest('.tabheader__item')
        if (!tab) return;
        const tabItem = document.querySelectorAll('.tabheader__item')
        const content = document.querySelectorAll('.tabcontent')

        tabItem.forEach(tab => tab.classList.remove('tabheader__item_active'))
        content.forEach(text => text.classList.remove('show'))

        tab.classList.add('tabheader__item_active')
        document.querySelector(`.tabcontent--${tab.dataset.tab}`).classList.add('show')

    }
    _goToSlide(slide) {
        slides.forEach((s, i) => s.style.transform = `translateX(${110 * (i -slide)}%)`)
        numSlide.textContent = String(this._curSlide + 1).padStart(2, '0')
    }
    _nextSlide() {
        if (this._curSlide === this._maxSlide - 1) {
            this._curSlide = 0;
        } else {
            this._curSlide++
        }
        this._goToSlide(this._curSlide)
    }
    _prevSlide() {
        if (this._curSlide === 0) {
            this._curSlide = this._maxSlide - 1;
        } else {
            this._curSlide--;
        }
        this._goToSlide(this._curSlide)
    }
    _promTimer() {
        this._timer()
        let basicTimer = setInterval(this._timer, 1000)
        let html = `
       <span class='promotion__time'>The promotion will end on ${month[this._untilTime.getMonth()]} ${String(this._untilTime.getDate()).padStart(2,'0')} at ${String(this._untilTime.getHours()).padStart(2,'0')}:${String(this._untilTime.getMinutes()).padStart(2,'0')}</span>
    `
        promotionDesc.insertAdjacentHTML('beforeend', html)
        return basicTimer
    }

    _timer() {
        this._untilTime = new Date(2023, 11, 31, 0, 0, 0)
        this._curTime = new Date()
        let inter = this._untilTime - this._curTime
        const days = Math.floor(inter / (1000 * 60 * 60 * 24))
        const hours = Math.floor(inter / (1000 * 60 * 60) % 24)
        const mins = Math.floor((inter / (1000 * 60)) % 60)
        const sec = Math.floor((inter / (1000)) % 60)

        day.textContent = String(days).padStart(2, '0');
        hour.textContent = String(hours).padStart(2, '0');
        min.textContent = String(mins).padStart(2, '0');
        second.textContent = String(sec).padStart(2, '0');


        if (days === 0 && hours === 0 && mins === 0 && sec === 0) {
            clearInterval(basicTimer)
            promTitle.textContent = 'The promotion have already ended :('
        }
        inter--
    }
    _scrollSection() {
        //First way
        // const section = offer.getBoundingClientRect()
        // window.scrollTo({
        //     left: sctroll.left + window.pageXOffset,
        //     top: sctroll.top + window.pageYOffset,
        //     behavior: "smooth",
        // })

        //Second way
        offer.scrollIntoView({
            behavior: 'smooth'
        })
    }

}

const app = new App()

const header = document.querySelector('.header')
const preview = document.querySelector('.preview')
const back = document.querySelector('.back__top')
// console.log(preview);
// console.log(window.scrollY);
const headerObs = function (entries) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            back.classList.add('back__sticy')
        } else {
            back.classList.remove('back__sticy')

        }
    })
}

const obsrHeader = new IntersectionObserver(headerObs, {
    root: null,
    threshold: 0,
})
obsrHeader.observe(header)

// window.addEventListener('scroll', function () {
//     if (window.scrollY < preview.top && this.window.scrollY === 0) {
//         back.classList.remove('back__sticy')
//     }
//     if (window.scrollY > preview.top) {
//         back.classList.add('back__sticy')
//     }

// })
back.addEventListener('click', function () {
    // console.log('ffff');
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})