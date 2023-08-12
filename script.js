//Display Date and Time Function
function time() {

    setInterval(() => {
        let date_object = new Date();

        let date = document.querySelectorAll(".date")[0];
        date.innerHTML = date_object.toDateString();

        let time = document.querySelectorAll(".time")[0];
        time.innerHTML = date_object.toLocaleTimeString();
    }, 1000);

}
document.body.addEventListener("load", time());

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
let todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

document.getElementsByClassName("message")[0].hidden = false;
let oldInputValue;
let arr = ["0"];
//Add New Todo Functionality 
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementsByClassName("message")[0].hidden = true;
    const inputValue = todoInput.value;
    arr.push(inputValue); // Add index to todo list.
    let index = arr.indexOf(inputValue, 1); // Add index to todo list.
    localStorage.setItem(arr.indexOf(inputValue),inputValue);
    if (inputValue)
        saveTodo(index, inputValue); //Save Function
})

const saveTodo = (index, text) => {
    const todo = document.createElement("div");
    todo.className = "todo";
    todo.innerHTML = `<span>${index}</span><h3>${text}</h3>
    <button class="finish-todo">
        <i class="fa-solid fa-check"></i>
    </button>
    <button class="edit-todo">
        <i class="fa-solid fa-pen"></i>
    </button>
    <button class="remove-todo">
        <i class="fa-solid fa-xmark"></i>
    </button>`

    todoList.appendChild(todo);
    todoInput.value = "";
    todoInput.focus();
}

//Add Todo Items events for complete, remove and edit
document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3"))
        todoTitle = parentEl.querySelector("h3").innerText;

    if (targetEl.classList.contains("finish-todo"))
        parentEl.classList.toggle("done");

    if (targetEl.classList.contains("remove-todo"))
        parentEl.remove();

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

})

//Toggle function for toggle hide/show

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

//Cancel button event in Edit form

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
})

//Edit Todo Items updateTodo() to update existing Todo Items.

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;
    if (editInputValue)
        updateTodo(editInputValue) //Update value function

    toggleForms();
})

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo")[1];
    let todoTitle = todos.querySelector("h3");
    
    if (todoTitle.innerText === oldInputValue)
        todoTitle.innerText = text;
}



