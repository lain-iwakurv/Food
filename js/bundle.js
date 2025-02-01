/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
    // Calculator

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }
    
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }



    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
            
                });

                e.target.classList.add(activeClass);

                calcTotal();
        });
        });
    }


    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight': 
                    weight = +input.value;
                    break;
                case 'age': 
                    age = +input.value;
                    break;                    
            }
            calcTotal();
        });


    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    // Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes){ // классы формируются через рест оператор. Тут лежит массив из классов которые есть в н-р в css / html. Это нужно для того чтобы мы если захотим добавить определнный класс только одной карточке чтобы его стилизовать по другому н-р чтобы только он был розовым
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector); //  тут лежит дом-элемент. То куда мы будем наши элементы пушить
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() { // через этот метод мы создаем структуру карточек
            const element = document.createElement('div');
            if (this.classes.length === 0) {   // это условие нам нужно если мы забудем при создании нового объекта (ниже в коде) указать класс(ы) которые должны быть у нашего element
                this.element = 'menu__item';
                element.classList.add(this.element);
            }
            else {
                this.classes.forEach(className => element.classList.add(className));
            }
        
            element.innerHTML += `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span>
                        грн/день</div>
                </div>`;
            this.parent.append(element); // наш новосозданный элемент помещаем в parent(.menu .container)
        
        }
    };

    const getResource = async (url) => { // отвечает за отправку данных
        const res = await fetch(url);  // в переменной храним промис который вохвращается от фетча    
        
        if (!res.ok) { //если выкинем ошибку в ручном режиме то сработает блок кода catch
            throw new Error(`Could not fetch ${url}, status: ${res.status}`); 
        }

        return await res.json(); // это у нас промис, декодирует ответ в формате JSON. Это ответ от сервера на наш запрос фетч

    }

    /* 1 способ создания карточек */ 
    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => { // использовали деструктуризацию объекта
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    /* 2 способ создания карточек */
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));
    
    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span>
    //                     грн/день</div>
    //             </div>`;  
                
    //             document.querySelector('.menu .container').append(element);
    //     });
    // }
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
        
    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => { // отвечает за отправку данных
        const res = await fetch(url, { // в переменной храним промис который вохвращается от фетча
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: /* formData */ data           
        }); 

        return await res.json(); // это у нас промис, декодирует ответ в формате JSON. Это ответ от сервера на наш запрос фетч

    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;`;
            
            form.insertAdjacentElement('afterend', statusMessage);

            /* const request = new XMLHttpRequest();
            request.open('POST', 'server.php'); */


            // request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form); // Если передать в конструктор элемент HTML-формы form, то создаваемый объект автоматически прочитает из неё поля. При помощи formData собираем все данные с нашей формы

             // Если сервер должен принимать данные в формате JSON, а не в обычном формате ()

            /*  const object = {}; // если мы будем работать с форматом JSON то нужно formData переписать в обычный объект, тк JSON не понимает formData
            formData.forEach((key, value) => { 
                object[key] = value;
            }) */

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


           // const json = JSON.stringify(object); 


            // request.send(json);

            // fetch('server.php', {
            //     method: "POST",
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: /* formData */ // JSON.stringify(object)
            // }) 

            postData('http://localhost:3000/requests', json) /* JSON.stringify(object)*/
            // .then(data => data.text()) // превращаем текст в обычный текст
            .then(data => {
                console.log(data) // выводится то что нам вернул сервер
                showThanksModal(message.success);
                statusMessage.remove(); //удаляем наш спиинер
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

            /*request.addEventListener('load', () => { // обработка результата нашего запроса
                if(request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    statusMessage.remove(); 
                    form.reset();
                } else {
                    showThanksModal(message.failure);
                }
            }) */
        });
    };

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class = "modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>`;


        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    };
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {

    // Modal

    const modal = document.querySelector('.modal'),
          modalTrigger = document.querySelectorAll('[data-modal]');
    
    
    // modalTrigger.forEach(btn => {
    //     btn.addEventListener('click', () => {
    //         // modal.classList.add('show');
    //         // modal.classList.remove('hide');
    //     })
    // });

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    };

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';        
    };

    // modalCloseBtn.addEventListener('click', () => {
    //     // modal.classList.add('hide');
    //     // modal.classList.remove('show');

    //     closeModal();
    // });


    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == "") {//если мы кликаем по подложку (modal) или на крестик то у нас закрывается модалка
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    // Slider

     const prevArrow = document.querySelector('.offer__slider-prev'),
           slider = document.querySelector('.offer__slider'),
           nextArrow = document.querySelector('.offer__slider-next'),
           sliderImages = document.querySelectorAll('.offer__slide'),
           currentNumber = document.querySelector('#current'),
           totalNumber = document.querySelector('#total'),
           slidesWrapper = document.querySelector('.offer__slider-wrapper'),
           slidesField = document.querySelector('.offer__slider-inner'),
           width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    if (sliderImages.length < 10) {
        totalNumber.textContent = `0${sliderImages.length}`;
        currentNumber.textContent = `0${slideIndex}`;
    } else {
        total.textContent = sliderImages.length;
        currentNumber.textContent = slideIndex;
    }

    slidesField.style.width = 100 * sliderImages.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    sliderImages.forEach((slide) => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');

    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;`;
    
    slider.append(indicators);

    for (let i = 0; i < sliderImages.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;`;

        if (i == 0) {
            dot.style.opacity = 1;
        };
        indicators.append(dot);
        dots.push(dot);
    };

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    nextArrow.addEventListener('click', (e) => {
        if (offset == +deleteNotDigits(width) * (sliderImages.length - 1)){
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == sliderImages.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (sliderImages.length < 10) {
            currentNumber.textContent = `0${slideIndex}`;
        } else {
            currentNumber.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prevArrow.addEventListener('click', (e) => {
        if (offset == 0){
            offset = +deleteNotDigits(width) * (sliderImages.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
 
        if (slideIndex == 1) {
            slideIndex = sliderImages.length;
        } else {
            slideIndex--;
        };

        if (sliderImages.length < 10) {
            currentNumber.textContent = `0${slideIndex}`;
        } else {
            currentNumber.textContent = slideIndex;
        };        

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
        
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (sliderImages.length < 10) {
                currentNumber.textContent = `0${slideIndex}`;
            } else {
                currentNumber.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;

        });
    })

    /* 

    showSlider();

    function showSlider(n) {
        if (n > sliderImages.length) {
            slideIndex = 1;
        } 
        if (n < 1) {
            slideIndex = sliderImages.length;
        }
        sliderImages.forEach((slide => {
            slide.classList.add('hide');
            slide.classList.remove('show');
        }));        
        sliderImages[slideIndex - 1].classList.add('show');
        sliderImages[slideIndex - 1].classList.remove('hide');
        currentNumber.textContent = addZero(slideIndex);
        totalNumber.textContent = addZero(sliderImages.length);
    };

    function plusSlides(n) {
        showSlider(slideIndex += n);
        
    }

    function addZero(num) {
        if(num < 10) {
            return `0${num}`;
        }else {
            return num;
        };
    };
    
    prevArrow.addEventListener('click', (e) => {
        plusSlides(-1);
    });

    nextArrow.addEventListener('click', (e) => {
        plusSlides(1);
    }); */

}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsParent = document.querySelector('.tabheader__items'),
          tabsContent = document.querySelectorAll('.tabcontent');
    
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        })

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')) { 
            tabs.forEach((item, i) => {
                if(target == item) { //проверяется совпадает ли нами кликнутый элемент с текущим элементом из массива(item)
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
        // Timer

    const deadline = '2025-01-20';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); // тут мы получаем кол-во миллисекунд которое будет в нашем конечном времени до которого нужно дойти/досчитать
              
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
        else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // 1000 миллискунд умножаем на 60 и так мы получаем кол-во миллисекнуд в одной минуте потом в 1 одном часе потом в одних сутках в итоге получаем сколько суток осталось в до окончания даты (делим общее кол-во миллисекунд на миллисекунды в одном дне)
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60); // (t / 1000) чтобы получить кол-во секунд внутри миллисекунд
        }
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }; // чтобы эти переменные вернуть наружу потому что они не видны вне функции
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        else {
            return num;
        }
    };

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
               days = timer.querySelector('#days'),
               hours = timer.querySelector('#hours'),
               minutes = timer.querySelector('#minutes'),
               seconds = timer.querySelector('#seconds'),
               timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime); // чтобы поолучить анонимный объект с данными. В эту переменную записывается результат работы функции getTimeRemaining(endtime). Результат этой работы это объект

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }   

    setClock('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider();
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map