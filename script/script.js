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







const track = document.querySelector('.carousel_track');
const leftButton = document.querySelector('.carousel_button.left');
const rightButton = document.querySelector('.carousel_button.right');
const dots = document.querySelectorAll('.dot');
const totalImages = 15; // 전체 이미지 수
const imageWidth = 285;

let itemsPerSlide = window.innerWidth <= 1024 ? 1 : 5;
let slideWidth = itemsPerSlide * imageWidth;
let totalActualSlides = Math.ceil(totalImages / itemsPerSlide);
let currentSlide = 0;
let autoSlideInterval;

// 클론 슬라이드 추가 (첫 슬라이드를 복제해서 마지막에 붙임)
function addClones() {
    const carouselItems = document.querySelectorAll('.recommended_restaurant');
    for (let i = 0; i < itemsPerSlide; i++) {
        const clone = carouselItems[i].cloneNode(true);
        track.appendChild(clone);
    }
}
addClones();

// 오른쪽 버튼
rightButton.addEventListener('click', () => {
    currentSlide++;
    updateCarousel();
});

// 왼쪽 버튼
leftButton.addEventListener('click', () => {
    if (currentSlide === 0) return;
    currentSlide--;
    updateCarousel();
});

// 닷 클릭
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
});

// 캐러셀 이동
function updateCarousel() {
    track.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
    const dotIndex = (currentSlide === totalActualSlides) ? 0 : currentSlide;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === dotIndex);
    });
}

// 무한 루프
track.addEventListener('transitionend', () => {
    if (currentSlide === totalActualSlides) {
        track.style.transition = 'none';
        currentSlide = 0;
        track.style.transform = `translateX(0px)`;
        void track.offsetWidth; // reflow
        track.style.transition = 'transform 0.5s ease';
    }
});



// 초기 자동 슬라이드 시작
startAutoSlide();

// 윈도우 리사이즈 대응
window.addEventListener('resize', () => {
    stopAutoSlide();
    itemsPerSlide = window.innerWidth <= 1024 ? 1 : 5;
    slideWidth = itemsPerSlide * imageWidth;
    totalActualSlides = Math.ceil(totalImages / itemsPerSlide);
    startAutoSlide();
});

// 자동 슬라이드 시작
function startAutoSlide() {
    if ( window.innerWidth <= 760 || window.innerWidth <= 1024 ) {
        
        setInterval(() => {
            currentSlide++;
            updateCarousel();
        }, 3000);
    }
}

// 자동 슬라이드 중지
function stopAutoSlide() {
    clearInterval();
}




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
