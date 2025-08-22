let listToDo = [];

// Validate Form Inputs
function ValidateForm() {
  // DOM Form Elements
  const taskInput = document.getElementById("task-input");
  const dueDateInput = document.getElementById("due-date-input");

  if (taskInput.value !== "" && dueDateInput.value !== "") {
    AddToDo(taskInput.value, dueDateInput.value);
  } else {
    alert("Please enter a task!");
  }
}

// Add A New To-Do
function AddToDo(taskInput, dueDateInput) {
  listToDo.push({
    task: taskInput,
    dueDate: dueDateInput,
  });

  RenderToDoList();
}

// Render To-Do List
function RenderToDoList() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  for (let i = 0; i < listToDo.length; i++) {
    taskList.innerHTML += `<li class="border-b py-2">${listToDo[i].task} - Due: ${listToDo[i].dueDate}</li>`;
  }
}

// Delete All To-Do
function DeleteAll() {
  listToDo = [];
  RenderToDoList();
}
