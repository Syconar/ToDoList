const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUl = document.getElementById("todo-list");

let allTodos = [];

todoForm.addEventListener("submit", function(e){
    e.preventDefault();
    addTodo();
});

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        allTodos.push(todoText);
        updateTodoList();
        todoInput.value = "";
    }
};

function updateTodoList(){
    todoListUl.innerHTML = "";
    allTodos.forEach((todo, todoIndex) =>{
        todoItem = createTodoItem(todo, todoIndex);
        todoListUl.append(todoItem);
    })
};

function createTodoItem(todo, todoIndex){
    const todoId = "list-item-"+todoIndex;
    const todoLi = document.createElement("li");
    todoLi.className = "list-item"
    todoLi.innerHTML = `
                    <input type="checkbox" id="${todoId}">
                    <label for="${todoId}" class="custom-checkbox">
                        <i fill="transparent" class="fa-solid fa-check"></i>
                    </label>

                    <label for="${todoId}" class="list-text">
                        ${todo}
                    </label>

                    <button class="delete-btn">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                    `
    return todoLi;
}