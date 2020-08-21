"use strict";

//getTime START
const clockContainer = document.querySelector(".js-clock");
const clockTxt = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const time = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
  clockTxt.innerText = time;
}
//getTime END

//init START
function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
//init End
