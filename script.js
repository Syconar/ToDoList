const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUl = document.getElementById("todo-list");

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", function(e){
    e.preventDefault();
    addTodo();
});

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
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
    const todoText = todo.text;
    todoLi.className = "list-item"
    todoLi.innerHTML = `
                    <input type="checkbox" id="${todoId}">
                    <label for="${todoId}" class="custom-checkbox">
                        <i fill="transparent" class="fa-solid fa-check"></i>
                    </label>

                    <label for="${todoId}" class="list-text">
                        ${todoText}
                    </label>

                    <button class="delete-btn">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                    `
    const deleteBtn = todoLi.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex);
    });
    const checkbox = todoLi.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.completed;
    return todoLi;
};

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos(){
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson)
};

function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
};