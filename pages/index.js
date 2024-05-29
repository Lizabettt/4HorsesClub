const carouselStages = document.querySelector(".stages__list");
const stages = document.querySelectorAll(".stages__list-items");

const pointList = document.querySelector(".stages__points");
const point = document.querySelectorAll(".stages__point");

const btnLeft = document.querySelector(".btn-type-left");
const btnRight = document.querySelector(".btn-type-right");

let currentSlide = 0;

function heandleMovingRight() {
  currentSlide++;
  if (currentSlide > stages.length - 1) {
    currentSlide = 0;
  }
  changeSlide(currentSlide);
  changeDisabled(currentSlide);
  console.log(currentSlide);
}

function heandleMovingLeft() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = stages.length - 1;
  }
  changeSlide(currentSlide);
  changeDisabled(currentSlide);
}

function handlePagingClick(e) {
  point.forEach((dot, i) => {
    if (dot === e.target) {
      currentSlide = i;
    }
  });
  changeSlide(currentSlide);
  changeDisabled(currentSlide);
}
function changeSlide(slide) {
  for (let i = 0; i < point.length; i++) {
    point[i].classList.remove("stages__point-type-active");
  }
  point[slide].classList.add("stages__point-type-active");
  carouselStages.style.transform = "translateX(" + slide * -100 + "vw)";
}
function changeDisabled(slide) {
  if (slide === 0) {
    btnLeft.disabled = true;
    btnLeft.classList.add("btn-type-disabled");
    console.log("Slide=0");
    console.log(slide);
  } else if (slide === 4) {
    btnRight.disabled = true;
    btnRight.classList.add("btn-type-disabled");
    console.log("Slide=4");
    console.log(slide);
  } else {
    btnLeft.disabled = false;
    btnRight.disabled = false;
    btnLeft.classList.remove("btn-type-disabled");
    btnRight.classList.remove("btn-type-disabled");
    btnLeft.classList.add("btn-type-active");
    btnRight.classList.add("btn-type-active");
    console.log("Slide=123");
    console.log(slide);
  }
}

//listeners
btnRight.addEventListener("click", heandleMovingRight);
btnLeft.addEventListener("click", heandleMovingLeft);
pointList.addEventListener("click", handlePagingClick);
