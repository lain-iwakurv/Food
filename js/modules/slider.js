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