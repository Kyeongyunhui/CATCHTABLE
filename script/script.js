const slides = document.querySelector('.slides');
const mainDots = document.querySelectorAll('.slideDot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;
const totalSlides = 3; // 실제 슬라이드 개수 (복사된 6번째 슬라이드는 제외)
let interval;

function updateSlide(index, smooth = true) {
    slides.style.transition = smooth ? 'transform 0.5s ease-in-out' : 'none';
    slides.style.transform = `translateX(-${index * 100}vw)`;

    // 닷 업데이트
    mainDots.forEach(slideDots => slideDots.classList.remove('active'));
    mainDots[index % totalSlides].classList.add('active');
}

function nextSlide() {
    currentIndex++;
    updateSlide(currentIndex);

    if (currentIndex === totalSlides) {
        setTimeout(() => {
            currentIndex = 0;
            updateSlide(currentIndex, false);
        }, 500);
    }
}

function prevSlide() {
    if (currentIndex === 0) {
        currentIndex = totalSlides;
        updateSlide(currentIndex, false);

        setTimeout(() => {
            currentIndex--;
            updateSlide(currentIndex);
        }, 10);
    } else {
        currentIndex--;
        updateSlide(currentIndex);
    }
}

function startAutoSlide() {
    interval = setInterval(nextSlide, 3000);
}

function resetAutoSlide() {
    clearInterval(interval);
    startAutoSlide();
}

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

mainDots.forEach((slideDots, index) => {
    slideDots.addEventListener('click', () => {
        currentIndex = index;
        updateSlide(currentIndex);
        resetAutoSlide();
    });
});

startAutoSlide();







document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".carousel_track");
    const leftButton = document.querySelector(".carousel_button.left");
    const rightButton = document.querySelector(".carousel_button.right");
    const dots = document.querySelectorAll(".dot");
    const totalImages = 15;
    const imageWidth = 285;
    
    let itemsPerSlide;
    let slideWidth;
    let totalActualSlides;
    let currentSlide = 0;
    let autoSlideInterval;

    function updateItemsPerSlide() {
        if (window.innerWidth >= 1440) {
            itemsPerSlide = 5;
        } else if (window.innerWidth >= 960) {
            itemsPerSlide = 3;
        } else if (window.innerWidth >= 640) {
            itemsPerSlide = 2;
        } else {
            itemsPerSlide = 1;
        }
        slideWidth = itemsPerSlide * imageWidth;
        totalActualSlides = Math.ceil(totalImages / itemsPerSlide);
        track.style.width = `${slideWidth}px`; // 가시 영역 조정
        track.parentElement.style.overflow = "hidden"; // 넘치는 이미지 숨김
    }

    function addClones() {
        const carouselItems = document.querySelectorAll(".recommended_restaurant");
        if (carouselItems.length < itemsPerSlide) return;

        for (let i = 0; i < itemsPerSlide; i++) {
            const clone = carouselItems[i].cloneNode(true);
            track.appendChild(clone);
        }
    }

    function updateCarousel(instant = false) {
        if (instant) {
            track.style.transition = "none";
        } else {
            track.style.transition = "transform 0.5s ease";
        }
        track.style.transform = `translateX(${-currentSlide * slideWidth}px)`;

        let dotIndex = currentSlide % totalActualSlides;
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === dotIndex);
        });
    }

    rightButton.addEventListener("click", () => {
        currentSlide++;
        updateCarousel();
    });

    leftButton.addEventListener("click", () => {
        if (currentSlide === 0) return;
        currentSlide--;
        updateCarousel();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    track.addEventListener("transitionend", () => {
        if (currentSlide >= totalActualSlides) {
            currentSlide = 0;
            updateCarousel(true);
        }
    });

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(() => {
            currentSlide++;
            updateCarousel();
        }, 3000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    window.addEventListener("resize", () => {
        stopAutoSlide();
        updateItemsPerSlide();
        updateCarousel(true);
        if (window.innerWidth < 960) {
            leftButton.style.display = "none";
            rightButton.style.display = "none";
            dots.forEach(dot => dot.style.display = "none");
        } else {
            leftButton.style.display = "block";
            rightButton.style.display = "block";
            dots.forEach(dot => dot.style.display = "block");
        }
        startAutoSlide();
    });

    updateItemsPerSlide();
    addClones();
    updateCarousel(true);
    startAutoSlide();
});






// 탭메뉴
const tabs = document.querySelectorAll('.tab');
const store = document.querySelectorAll('.store');
console.log(tabs);
console.log(store);

tabs.forEach(tab => {
    // forEach((item, index, array) => {
    // item : 현재 순화중인 배열의 요소(필수!, 작명은 자유)
    // index : 현재 요소의 인덱스(선택)
    // array : 현재 순화중인 배열 자체(선택)
    // });
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        store.forEach(tc => tc.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab_' + tab.dataset.tab).classList.add('active');
        // dataset : HTML 요소의 data-* 속성을 읽거나 설정할 수 있는 js객체
        // tab.dataset : 요소의 모든 data-tab 번호를 가져옴
        // tab.dataset.tab : domString이 아닌 tab속성의 값만 빼오겠다는 뜻
        console.log(store.dataset);
        console.log(store.dataset.tab);
    });
});


// 헤더 페이드인


const header = document.querySelector("header");
const headerMenu = document.querySelector(".menu");
const headerLogo = document.querySelector(".logo");

let posY = 100; //스크롤 위치값 넣을 변수 생성
window.addEventListener("scroll", (e) => {
    if (posY < window.scrollY) {
        headerHide();
    } else {
        headerShow();
    }
    posY = window.scrollY;
});

function headerHide() {
    header.classList.add("hide");
    headerMenu.style.background = "rgba(0,0,0,0)";
    headerLogo.style.color = "#FF3D00";


}

function headerShow() {
    header.classList.remove("hide");
    headerLogo.style.color = "#ffffff";
    headerMenu.style.background = "#FF3D00";

}
