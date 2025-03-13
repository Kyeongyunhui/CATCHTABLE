const slides = document.querySelector('.slides');
const mainDots = document.querySelectorAll('.slideDots');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;
const totalSlides = 3; // 실제 슬라이드 개수 (복사된 6번째 슬라이드는 제외)
let interval;

function updateSlide(index) {
    slides.style.transition = 'transform 0.5s ease-in-out';
    slides.style.transform = `translateX(-${index * 100}'vw)`;

    // 닷 업데이트
    mainDots.forEach(slideDots => slideDots.classList.remove('active'));
    mainDots[index % totalSlides].classList.add('active');
}

function nextSlide() {
    currentIndex++;
    updateSlide(currentIndex);

    if (currentIndex === totalSlides) {
        setTimeout(() => {
            slides.style.transition = 'none';
            currentIndex = 0;
            slides.style.transform = `translateX(0vw)`;
        }, 500);
    }
}

function prevSlide() {
    if (currentIndex === 0) {
        slides.style.transition = 'none';
        currentIndex = totalSlides;
        slides.style.transform = `translateX(-${currentIndex * 100}vw)`;

        setTimeout(() => {
            slides.style.transition = 'transform 0.5s ease-in-out';
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
const itemsPerSlide = 5;
// 총 15개의 이미지이므로 실제 슬라이드는 3개
const totalActualSlides = 3;
const slideWidth = 1425; // 캐러셀 컨테이너 너비 (285px * 5)
let currentSlide = 0;

// 첫 슬라이드(이미지 1~5)를 복제하여 트랙 끝에 추가 (무한 루프를 위한 클론)
const carouselItems = document.querySelectorAll('.recommended_restaurant');
for (let i = 0; i < itemsPerSlide; i++) {
    const clone = carouselItems[i].cloneNode(true);
    track.appendChild(clone);
}

// 오른쪽 버튼: 다음 슬라이드 (오른쪽으로 이동, wrap-around 적용)
rightButton.addEventListener('click', () => {
    currentSlide++;
    updateCarousel();
});

// 왼쪽 버튼: 이전 슬라이드 (왼쪽으로 이동)
leftButton.addEventListener('click', () => {
    if (currentSlide === 0) return; // 첫 슬라이드라면 동작하지 않음
    currentSlide--;
    updateCarousel();
});

// 닷 클릭 시 해당 슬라이드로 이동 (복제된 슬라이드가 있을 경우 index 처리)
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
});

// 캐러셀 업데이트: 트랙 이동 및 닷 상태 변경
function updateCarousel() {
    track.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
    // clone 슬라이드일 경우(현재 슬라이드가 3이면) 닷은 첫 번째로 표기
    const dotIndex = (currentSlide === totalActualSlides) ? 0 : currentSlide;
    dots.forEach((dot, index) => {
        if (index === dotIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 트랜지션 종료 후, 클론 슬라이드에 도달하면 즉시 처음 슬라이드로 전환 (무한 루프 효과)
track.addEventListener('transitionend', () => {
    if (currentSlide === totalActualSlides) {
        track.style.transition = 'none';
        currentSlide = 0;
        track.style.transform = `translateX(0px)`;
        // reflow 강제 후 다시 transition 복구
        void track.offsetWidth;
        track.style.transition = 'transform 0.5s ease';
    }
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
            tab.addEventListener('click',()=>{
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
        })
