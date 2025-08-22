let list_to_do = [];

// Validate Form Inputs
function ValidateForm() {
    // DOM Form Elements
    const task_input = document.getElementById("task-input")
    const due_date_input = document.getElementById("task-input")

    if task_input.value != '' || due_date_input.value != '' {
        AddToDo(task_input.value, due_date_input.value)
    }
}

// Add A New To-Do
function AddToDo() {
    
}