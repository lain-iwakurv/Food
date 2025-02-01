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