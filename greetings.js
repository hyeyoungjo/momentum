//1. check if there's username saved in local storage.
//2-1. if there is, show "Hello, username" (and hide formAskName asking username)
//2-2. if there is not, ask username
//2-2-1. when user submit username, block default action of event "submit"
//2-2-2. save username in local storage.
//2-2-3. show "Hello, username" (same with 2-1)

const formAskName = document.querySelector(".js-formAskName"),
  inputName = formAskName.querySelector("input"),
  greetings = document.querySelector(".js-greetings");

const CL_REVEAL = "reveal";
const LS_USERNAME = "username";

function saveUserName(name) {
  console.log(name, "saved");
  localStorage.setItem("username", name);
}

function handleSubmit(event) {
  event.preventDefault();
  const receivedUserName = inputName.value;
  saveUserName(receivedUserName);
  formAskName.classList.remove(CL_REVEAL);
  paintGreetings(receivedUserName);
}

function askUserName() {
  formAskName.classList.add(CL_REVEAL);
}

function paintGreetings(txt) {
  greetings.innerHTML = `Hello, ${txt}!`;
  greetings.classList.add(CL_REVEAL);
}

function loadLS() {
  const currentUserName = localStorage.getItem(LS_USERNAME);
  if (currentUserName === null || currentUserName === "") {
    askUserName();
  } else {
    paintGreetings(currentUserName);
  }
}

function init() {
  loadLS();
  formAskName.addEventListener("submit", handleSubmit);
}

init();
