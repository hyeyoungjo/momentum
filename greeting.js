//1. check if there's username saved in local storage.
//2-1. if there is, show "Hello, username" (and hide form asking username)
//2-2. if there is not, ask username
//2-2-1. when user submit username, block default action of event "submit"
//2-2-2. save username in local storage.
//2-2-3. show "Hello, username" (same with 2-1)

const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greetings = document.querySelector(".js-greetings");

const CL_REVEAL = "reveal";

function saveUserName(name) {
  console.log(name, "saved");
  localStorage.setItem("username", name);
}

function handleSubmit(event) {
  event.preventDefault();
  const receivedUserName = input.value;
  saveUserName(receivedUserName);
  form.classList.remove(CL_REVEAL);
  paintGreetings(receivedUserName);
}

form.addEventListener("submit", handleSubmit);

function askUserName() {
  form.classList.add(CL_REVEAL);
}

function paintGreetings(txt) {
  greetings.innerHTML = `Hello, ${txt}!`;
  greetings.classList.add(CL_REVEAL);
}

function loadLS() {
  const currentUserName = localStorage.username;
  if (currentUserName == null || currentUserName == "") {
    askUserName();
  } else {
    paintGreetings(currentUserName);
  }
}

function init() {
  loadLS();
}

init();
