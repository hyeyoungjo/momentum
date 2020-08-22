//1. load local storage toDoList array
//2. if toDoList array is not empty,
//3. take user's inputTask
//4. and create li using inputTask value
//5. put inputTasks into array
//6. save that array to local storage toDoList array
//1-2. load toDoList array and for each one of the array, do 4-6 (use it like 3)
//7. delete task (from html)
//8. delete task (from local storage and save it)

const formToDoList = document.querySelector(".js-formToDoList"),
  inputTask = formToDoList.querySelector("input"),
  ulToDoList = document.querySelector(".js-ulToDoList");

const LS_TODOS = "toDos";
let arrToDos = [];
const delBtn_UNCHECKED = "far fa-circle";
const delBtn_CHECKED = "fas fa-check-circle";

function deleteTask(event) {
  //delete from html
  const selectedIcon = event.target;
  const selectedBtn = event.target.parentNode;
  const selectedLi = selectedBtn.parentNode;
  selectedBtn.querySelector("i").classList.remove();
  selectedBtn.querySelector("i").className = delBtn_CHECKED;
  window.setTimeout(function () {
    ulToDoList.removeChild(selectedLi);
  }, 500);

  //delete from local storage array
  const cleanToDos = arrToDos.filter(function (task) {
    return task.id !== parseInt(selectedLi.id);
  });
  arrToDos = cleanToDos;
  saveToDos();
  //if tasks are less than 6, delete column two
  if (arrToDos.length === 5) {
    console.log("sss");
    window.setTimeout(function () {
      ulToDoList.classList.remove("columnTwo");
    }, 600);
  }
}

function saveToDos() {
  //(local storage save everything in string)
  //JSON.stringify() : object -> string
  localStorage.setItem(LS_TODOS, JSON.stringify(arrToDos));
}

function paintTask(txt) {
  // create li, delBtn, span, (li id)
  const newId = arrToDos.length + 1;
  //if tasks are more than 10, don't take more
  if (newId > 10) {
    console.log("you have reached to maximum li");
    const username = localStorage.getItem(LS_USERNAME); //from greeting.js
    inputTask.placeholder = `Ten is maximum 😐. Don't forget to rest, ${username} 😧!`;
    return;
  } else {
    inputTask.placeholder = "Type task!";
  }
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkIcon = document.createElement("i");
  const span = document.createElement("span");
  checkIcon.className = delBtn_UNCHECKED;
  delBtn.appendChild(checkIcon);
  span.innerText = txt;
  checkIcon.addEventListener("click", deleteTask);
  // put delBtn, span into the li (and set id of li)
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  //put li into the ul
  ulToDoList.appendChild(li);
  //create objToDo
  const objToDo = {
    text: txt,
    id: newId,
  };
  //put objToDo into arrToDo
  arrToDos.push(objToDo);
  //save to local storage
  saveToDos();
  //if tasks are more than 5, make column two
  if (li.id > 5) {
    ulToDoList.classList.add("columnTwo");
  }
}

function handleSubmit() {
  event.preventDefault();
  const receivedTask = inputTask.value;
  paintTask(receivedTask);
  inputTask.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(LS_TODOS);
  if (loadedToDos !== null && loadedToDos !== "") {
    //JSON.parse() : string -> object
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (task) {
      paintTask(task.text);
    });
  }
}

function init() {
  loadToDos();
  formToDoList.addEventListener("submit", handleSubmit);
}

init();
