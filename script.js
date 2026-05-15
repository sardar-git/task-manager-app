const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

window.onload = function () {
  loadTasks();
};

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  createTaskElement(taskText);
  saveTask(taskText);

  taskInput.value = "";
}

function createTaskElement(taskText) {

  const li = document.createElement("li");

  li.innerHTML = `
    <span onclick="toggleComplete(this)">
      ${taskText}
    </span>

    <button class="delete-btn" onclick="deleteTask(this)">
      Delete
    </button>
  `;

  taskList.appendChild(li);
}

function deleteTask(button) {

  const li = button.parentElement;
  const taskText = li.querySelector("span").innerText;

  removeTaskFromStorage(taskText);

  li.remove();
}

function toggleComplete(task) {

  if (task.style.textDecoration === "line-through") {
    task.style.textDecoration = "none";
    task.style.color = "black";
  } else {
    task.style.textDecoration = "line-through";
    task.style.color = "gray";
  }
}

function saveTask(task) {

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    createTaskElement(task);
  });
}

function removeTaskFromStorage(taskText) {

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks = tasks.filter(task => task !== taskText);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
