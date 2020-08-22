//1. get random number
//2. call img by that number

"use strict";
const body = document.querySelector("body");

const IMG_NUMBER = 6;

function paintImg(imgNum) {
  const image = new Image();
  image.src = `imgs/${imgNum + 1}.jpg`;
  image.classList.add("bgImg");
  body.appendChild(image);
}

function generateRand() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number; ////0~5 random
}

function init() {
  const randomNumber = generateRand();
  paintImg(randomNumber);
}
init();
