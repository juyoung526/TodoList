let toDay = document.querySelector("#toDay"),
  toDate = document.querySelector("#date");

let user = document.querySelector("#user"),
  add = document.querySelector("#add");

let tabs = document.querySelectorAll(".tabs li");

// 시간
function time() {
  let day = new Date();
  let year = day.getFullYear();
  let month = day.getMonth() + 1;
  let date = day.getDate();

  toDay.innerText = `${year}년 ${month}월 ${date}일`;
}
time();

// 변수's
let taskList = []; //유저가 입력한 것을 담을 배열
let filterList = []; //진행과 완료를 담을 배열
let dayList = []; //시간을 담을 배열
let mode = "ongoing";

add.addEventListener("click", addTask);

function addTask() {
  console.log("click");

  let taskContent = {
    id: randomId(),
    taskContent: user.value,
    isComplete: false,
  };
  taskList.push(taskContent);
  console.log(taskList);
  user.value = "";
  render();
}

function render() {
  console.log("들어옴");

  list = [];

  if (mode == "ongoing") {
    list = taskList;
  } else if (mode == "done") {
    list = filterList;
  }

  let day = new Date();
  let year = day.getFullYear();
  let month = day.getMonth() + 1;
  let date = day.getDate();

  let result = "";

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      result += `
        <div class="task">
            <div class="content">
              <div class="list">
                <button onclick="complete(${list[i].id})">
                <i class="fa-solid fa-circle-check"></i>
                </button>
                <div>${list[i].taskContent}</div>
              </div>
              <button onclick="Delete(${list[i].id})">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div id="date">${`${year}-${month}-${date}`}</div>
          </div>
        `;
    } else {
      result += `
        <div class="task">
            <div class="content">
              <div class="list">
                <button onclick="complete(${list[i].id})">
                  <i class="fa-regular fa-circle"></i>
                </button>
                <div>${list[i].taskContent}</div>
              </div>
              <button onclick="Delete(${list[i].id})">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div id="date">${`${year}-${month}-${date}`}</div>
          </div>
        `;
    }
  }
  document.querySelector("#taskBoard").innerHTML = result;
}

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);

    tabs.forEach((item, index) => {
      item.classList.remove("text-info");
    });
    tabs[i].classList.add("text-info");
  });
}

function randomId() {
  return Date.now();
}

function complete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
    }
  }
  filter();
}
function Delete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
    }
  }
  filter();
}

function filter(event) {
  if (event) {
    mode = event.target.id;
  }

  filterList = [];

  if (mode == "ongoing") {
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}
