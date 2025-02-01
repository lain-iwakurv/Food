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