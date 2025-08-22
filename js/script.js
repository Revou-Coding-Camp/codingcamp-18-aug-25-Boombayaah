let listToDo = SON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// Initialize The Application
document.addEventListener("DOMContentLoaded", function () {
  renderToDoList();
  updateTaskCount();

  // Setup Form Submission
  document.getElementById("task-form").addEventListener("submit", function (e) {
    e.preventDefault();
    ValidateForm();
  });

  // Setup Filter Buttons
  document
    .getElementById("filter-all")
    .addEventListener("click", () => setFilter("all"));
  document
    .getElementById("filter-active")
    .addEventListener("click", () => setFilter("active"));
  document
    .getElementById("filter-completed")
    .addEventListener("click", () => setFilter("completed"));
});

// Validate Form Inputs
function validateForm() {
  // DOM Form Elements
  const taskInput = document.getElementById("task-input");
  const dueDateInput = document.getElementById("due-date-input");

  if (taskInput.value.trim() !== "") {
    addToDo(taskInput.value.trim(), dueDateInput.value || "Tanpa tenggat");
    taskInput.value = "";
    dueDateInput.value = "";
    taskInput.focus();
  } else {
    showAlert("Silakan masukkan tugas!");
  }
}

// Show Alert Message
function showAlert(message) {
  // Create Alert Element
  const alertEl = document.createElement("div");
  alertEl.className =
    "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 translate-x-full";
  alertEl.innerHTML =
    '<div class="flex items-center"> <i class="fas fa-exclamation-circle mr-2"></i> <span>${message}</span> </div>';

  document.body.appendChild(alertEl);

  // Animate In
  setTimeout(() => {
    alertEl.classList.remove("translate-x-full");
  }, 10);

  // Animate Out and Remove After 3 Seconds
  setTimeout(() => {
    alertEl.classList.add("translate-x-full");
    setTimeout(() => {
      document.body.removeChild(alertEl);
    }, 300);
  }, 3000);
}

// Add A New To-Do
function addToDo(taskInput, dueDateInput) {
  listToDo.push({
    id: Date.now(),
    task: taskInput,
    dueDate: dueDateInput,
    completed: false,
    createdAt: new Date().toISOString(),
  });

  saveToLocalStorage();
  renderToDoList();
  updateTaskCount();
}

// Toggle Completion Status
function toggleComplete(id) {
  listToDo = listToDo.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  saveToLocalStorage();
  renderToDoList();
  updateTaskCount();
}

// Edit A Task
function editTask(id) {
  const todo = listToDo.find((t) => t.id === id);
  if (!todo) return;

  const newTask = prompt("Edit tugas:", todo.task);
  if (newTask !== null && newTask.trim() !== "") {
    todo.task = newTask.trim();
    saveToLocalStorage();
    renderToDoList();
  }
}

// Delete A Single Task
function deleteTask(id) {
  if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
    listToDo = listToDo.filter((todo) => todo.id !== id);
    saveToLocalStorage();
    renderToDoList();
    updateTaskCount();
  }
}

// Delete All To-Do
function deleteAll() {
  if (listToDo.length === 0) return;

  if (confirm("Apakah Anda yakin ingin menghapus semua tugas?")) {
    listToDo = [];
    saveToLocalStorage();
    renderToDoList();
    updateTaskCount();
  }
}

// Set Current Filter
function setFilter(filter) {
  currentFilter = filter;

  // Update Button Styles
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("bg-indigo-600", "text-white");
    btn.classList.add(
      "bg-white",
      "text-indigo-600",
      "border",
      "border-indigo-600"
    );
  });

  document
    .getElementById(`filter-${filter}`)
    .classList.add("bg-indigo-600", "text-white");
  document
    .getElementById(`filter-${filter}`)
    .classList.remove(
      "bg-white",
      "text-indigo-600",
      "border",
      "border-indigo-600"
    );

  renderToDoList();
}

// Render To-Do List Based on Current Filter
function renderToDoList() {
  const taskList = document.getElementById("task-list");
  const emptyState = document.getElementById("empty-state");
  taskList.innerHTML = "";

  // Filter Task Based on Current Filter
  const filteredTasks = listToDo.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    emptyState.classList.remove("hidden");
    taskList.classList.add("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  taskList.classList.remove("hidden");

  filteredTasks.forEach((todo) => {
    const listItem = document.createElement("li");
    listItem.className = `py-4 px-2 flex items-start ${
      todo.completed ? "opacity-70" : ""
    }`;

    listItem.innerHTML = `<button onclick="toggleComplete(${
      todo.id
    })" class="mr-3 mt-1 flex-shrink-0">
              <i class="fas ${
                todo.completed
                  ? "fa-check-circle text-green-500"
                  : "fa-circle text-gray-300"
              } text-xl"></i>
            </button>
            <div class="flex-grow">
              <div class="flex justify-between items-start">
                <span class="${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }">${todo.task}</span>
                <div class="flex space-x-2">
                  <button onclick="editTask(${
                    todo.id
                  })" class="text-blue-500 hover:text-blue-700">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button onclick="deleteTask(${
                    todo.id
                  })" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <div class="text-sm text-gray-500 mt-1">
                <i class="far fa-calendar-alt mr-1"></i> ${todo.dueDate}
              </div>
            </div>
          `;

    taskList.appendChild(listItem);
  });
}

// Update Task Counter
function updateTaskCount() {
  const remainingTasks = listToDo.filter((todo) => !todo.completed).length;
  document.getElementById("task-count").textContent = remainingTasks;
}

//Save to Local Storage
function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(listToDo));
}
