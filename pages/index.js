const carouselStages = document.querySelector(".stages__list");
const stages = document.querySelectorAll(".stages__list-items");

const carouselPlayers = document.querySelector(".players__items");

const pointList = document.querySelector(".stages__points");
const point = document.querySelectorAll(".stages__point");

const btnLeft = document.querySelector(".btn-type-left");
const btnRight = document.querySelector(".btn-type-right");

const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");

const slideNumStages = 4;
const slideNumPlayers = 5;
const slideNumberPlayers = document.querySelector(".players__currentSlide");
const slideNumberPlayersAll = document.querySelector(
  ".players__slideNumPlayers"
);
let currentSlide = 0;
let timer = 0;

function heandleMovingRight() {
  currentSlide++;
}

function heandleMovingLeft() {
  currentSlide--;
}

//движение этапы
function heandleMovingRightStages() {
  heandleMovingRight(currentSlide);
  if (currentSlide > carouselStages.length - 1) {
    currentSlide = 0;
  }
  changeSlideStages(currentSlide, carouselStages);
  changePoint(currentSlide);
  changeDisabled(currentSlide, slideNumStages);
}

function heandleMovingLeftStages() {
  heandleMovingLeft(currentSlide);
  if (currentSlide < 0) {
    currentSlide = carouselStages.length - 1;
  }
  changeSlideStages(currentSlide, carouselStages);
  changePoint(currentSlide);
  changeDisabled(currentSlide, slideNumStages);
}

// движение игроки
function heandleMovingRightPlayers() {
  if (currentSlide >= slideNumPlayers) {
    currentSlide = -1;
  }
  heandleMovingRight(currentSlide);
  changeSlideNumber(currentSlide);
  if (document.documentElement.clientWidth < 500) {
    changeSlide(currentSlide, carouselPlayers);
    makeTimer();
  } else {
    changeSlideXL(currentSlide, carouselPlayers);
  }
}
function heandleMovingLeftPlayers() {
  heandleMovingLeft(currentSlide);
  changeSlide(currentSlide, carouselPlayers);
  changeSlideNumber(currentSlide);
  makeTimer();
}
// смена номера слайда
function changeSlideNumber(slide) {
  slideNumberPlayers.innerHTML = slide + 1;
  slideNumberPlayersAll.innerText = slideNumPlayers + 1;
}

// смена по таймеру
function makeTimer() {
  clearInterval(timer);
  timer = setInterval(function () {
    heandleMovingRightPlayers(currentSlide);
  }, 4000);
}

makeTimer();

//смена слайдов
function changeSlideStages(slide, carouselItems) {
  carouselItems.style.transform = "translateX(" + slide * -100 + "vw)";
}
function changeSlide(slide, carouselItems) {
  carouselItems.style.transform = "translateX(" + slide * -405 + "px)";
}
function changeSlideXL(slide, carouselItems) {
  carouselItems.style.transform = "translateX(" + slide * -413 + "px)";
}

// точки
function handlePagingClick(e) {
  point.forEach((dot, i) => {
    if (dot === e.target) {
      currentSlide = i;
    }
  });
  changeSlide(currentSlide, carouselStages);
  changePoint(currentSlide);
  changeDisabled(currentSlide);
}
function changePoint(slide) {
  for (let i = 0; i < point.length; i++) {
    point[i].classList.remove("stages__point-type-active");
  }
  point[slide].classList.add("stages__point-type-active");
}
// видимость кнопок
function changeDisabled(slide, slideNum) {
  if (slide === 0) {
    btnLeft.disabled = true;
    btnLeft.classList.add("btn-type-disabled");
  } else if (slide === slideNum) {
    btnRight.disabled = true;
    btnRight.classList.add("btn-type-disabled");
  } else {
    btnLeft.disabled = false;
    btnRight.disabled = false;
    btnLeft.classList.remove("btn-type-disabled");
    btnRight.classList.remove("btn-type-disabled");
    btnLeft.classList.add("btn-type-active");
    btnRight.classList.add("btn-type-active");
  }
}

//listeners
btnRight.addEventListener("click", heandleMovingRightStages);
btnLeft.addEventListener("click", heandleMovingLeftStages);
pointList.addEventListener("click", handlePagingClick);

btnNext.addEventListener("click", heandleMovingRightPlayers);
btnPrev.addEventListener("click", heandleMovingLeftPlayers);
