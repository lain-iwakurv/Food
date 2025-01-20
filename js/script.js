window.addEventListener('DOMContentLoaded', () => {
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


});

