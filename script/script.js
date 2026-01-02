const slides = document.querySelector(".slides");
const slideItems = document.querySelectorAll(".slides li");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dots = document.querySelectorAll(".slideDot");

const realCount = 3;           // 실제 슬라이드 개수
let index = 0;
let interval;

/* ---------- 위치 이동 ---------- */
function moveSlide(i, smooth = true) {
    slides.style.transition = smooth ? "transform 0.6s ease" : "none";
    slides.style.transform = `translateX(-${i * 100}vw)`;

    // 닷
    dots.forEach(dot => dot.classList.remove("active"));
    dots[i % realCount].classList.add("active");
}

/* ---------- 다음 ---------- */
function next() {
    index++;
    moveSlide(index);

    if (index === realCount) {
        setTimeout(() => {
            index = 0;
            moveSlide(index, false);
        }, 600);
    }
}

/* ---------- 이전 ---------- */
function prev() {
    if (index === 0) {
        index = realCount;
        moveSlide(index, false);

        setTimeout(() => {
            index--;
            moveSlide(index);
        }, 20);
    } else {
        index--;
        moveSlide(index);
    }
}

/* ---------- 자동 ---------- */
function startAuto() {
    stopAuto();
    interval = setInterval(next, 4000);
}
function stopAuto() {
    if (interval) clearInterval(interval);
}

/* ---------- 버튼 ---------- */
nextBtn.addEventListener("click", () => {
    next();
    startAuto();
});
prevBtn.addEventListener("click", () => {
    prev();
    startAuto();
});

/* ---------- 닷 ---------- */
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        moveSlide(index);
        startAuto();
    });
});

/* ---------- 시작 ---------- */
moveSlide(0, false);
startAuto();






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
