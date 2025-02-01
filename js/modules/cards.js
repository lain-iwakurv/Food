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