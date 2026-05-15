const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

window.onload = function () {
  loadTasks();
  updateTaskCount();
};

taskInput.addEventListener("keypress", function(event) {

  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  createTaskElement(taskText);
  saveTask(taskText);

  taskInput.value = "";

  updateTaskCount();
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

  updateTaskCount();
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

function clearAllTasks() {

  localStorage.removeItem("tasks");

  taskList.innerHTML = "";

  updateTaskCount();
}

function updateTaskCount() {

  const totalTasks = taskList.children.length;

  taskCount.innerText = `Total Tasks: ${totalTasks}`;
}
