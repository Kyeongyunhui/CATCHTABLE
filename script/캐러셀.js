const track = document.querySelector(".carousel_track");
const trackSlides = Array.from(track.children);
const carouselPrevBtn = document.querySelector(".nav.carousel_left");
const carouselNextBtn = document.querySelector(".nav.carousel_right");
const dotsContainer = document.querySelector(".carousel_dot");

let carouselIndex = 0;
let slideCount = trackSlides.length;
let slideWidth = trackSlides[0].offsetWidth;
let visibleSlides = 5;
let moveSlides = 5;
let dotCount = 3;
let carouselInterval;
let resizeTimeout = null;

function updateSliderSettings() {
    const width = window.innerWidth;
    if (width < 640) {
        visibleSlides = 1;
        moveSlides = 1;
        dotCount = 0;
    } else if (width < 960) {
        visibleSlides = 2;
        moveSlides = 1;
        dotCount = 0;
    } else if (width < 1440) {
        visibleSlides = 3;
        moveSlides = 3;
        dotCount = Math.ceil(slideCount / 3);
    } else {
        visibleSlides = 5;
        moveSlides = 5;
        dotCount = Math.ceil(slideCount / 5);
    }

    slideWidth = trackSlides[0].offsetWidth;
}

function cloneSlides() {
    const head = trackSlides.slice(0, visibleSlides).map(el => el.cloneNode(true));
    const tail = trackSlides.slice(-visibleSlides).map(el => el.cloneNode(true));

    head.forEach(el => track.appendChild(el));
    tail.reverse().forEach(el => track.insertBefore(el, track.firstChild));
}

function setInitialPosition() {
    track.style.transform = `translateX(${-slideWidth * visibleSlides}px)`;
    carouselIndex = 0;
}

function createDots() {
    dotsContainer.innerHTML = "";
    if (dotCount === 0) return;

    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.dataset.index = i;
        dot.addEventListener("click", () => {
            moveToSlide(i * moveSlides);
        });
        dotsContainer.appendChild(dot);
    }
}

function updateDots() {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach(dot => dot.classList.remove("active"));
    const activeIndex = Math.floor(carouselIndex / moveSlides) % dotCount;
    if (dots[activeIndex]) {
        dots[activeIndex].classList.add("active");
    }
}

function moveToSlide(index) {
    carouselIndex = index;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(${-(carouselIndex + visibleSlides) * slideWidth}px)`;
    updateDots();
}

function nextSlide() {
    carouselIndex += moveSlides;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(${-(carouselIndex + visibleSlides) * slideWidth}px)`;

    setTimeout(() => {
        if (carouselIndex >= slideCount) {
            carouselIndex = 0;
            track.style.transition = "none";
            track.style.transform = `translateX(${-slideWidth * visibleSlides}px)`;
        }
        updateDots();
    }, 510);
}

function prevSlide() {
    carouselIndex -= moveSlides;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(${-(carouselIndex + visibleSlides) * slideWidth}px)`;

    setTimeout(() => {
        if (carouselIndex < 0) {
            carouselIndex = slideCount - moveSlides;
            track.style.transition = "none";
            track.style.transform = `translateX(${-(carouselIndex + visibleSlides) * slideWidth}px)`;
        }
        updateDots();
    }, 510);
}

function startAutoSlide() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
        nextSlide();
    }, 3000);
}

function initSlider() {
    updateSliderSettings();
    cloneSlides();
    setInitialPosition();
    createDots();
    startAutoSlide();
    updateDots();
}

carouselPrevBtn.addEventListener("click", () => {
    prevSlide();
    startAutoSlide(); // reset timer
});
carouselNextBtn.addEventListener("click", () => {
    nextSlide();
    startAutoSlide(); // reset timer
});

window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        location.reload(); // 리사이즈 대응 위해 새로고침
    }, 300);
});

initSlider();