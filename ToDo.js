//elemanları seçme
const form = document.querySelector("#ToDoAddForm")
const todoInput = document.querySelector("#ToDoName");
const todoSearchInput = document.querySelector("#ToDoListSearch");
const todoList = document.querySelector(".list-group");

const clearButton = document.querySelector("#ClearButton");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];

let todos = [];

runEvents();

function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    document.addEventListener("click",removeTodo);
    clearButton.addEventListener("click",clearAllTodos);
    todoSearchInput.addEventListener("keyup",searchTodos);
}

function pageLoaded(){
    checkTodosStorage();
    todos.forEach(function(todo){
        addTodoUI(todo);
    });
}

function addTodo(e){
    const inputText = todoInput.value.trim();
    if(inputText == null || inputText == ""){
        showAlert("warning","Lütfen bir değer giriniz!");
    }
    else{
        addTodoUI(inputText);
        addTodoStorage(inputText)
        showAlert("success","Todo başarıyla eklendi.");
    }
    e.preventDefault();
}

function addTodoUI(newTodo){

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = newTodo;

    const a = document.createElement("a");
    a.className = "delete-item";
    a.href = "#";

    const i = document.createElement("i");
    i.className = "fa fa-remove"
    
    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    todoInput.value = "";
}

function addTodoStorage(newTodo){
    checkTodosStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function checkTodosStorage(){
    if(localStorage.getItem("todos")==null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message){
    const div = document.createElement("div");
    div.className = "alert alert-"+type; //div.className =`alert alert ${type}`; literal template
    div.role = "alert";
    div.textContent = message;

    firstCardBody.appendChild(div);
    
    setTimeout(() => {
        div.remove();
    }, 2000);
}

function removeTodo(e){
    if(e.target.className == "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        showAlert("success","Todo başarıyla silindi.");
        removeTodoStorage(e.target.parentElement.parentElement.textContent);
    }
}

function removeTodoStorage(removeTodo){
    checkTodosStorage();
    todos.forEach(function(todo,index){
        if(todo === removeTodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function clearAllTodos(e){
    checkTodosStorage();
    if(todos.length > 0){
        todoList.innerHTML = "";
        showAlert("success","Tüm Todo'lar silindi.");
        localStorage.removeItem("todos");
        todos = [];
    }
    else{
        showAlert("warning","Silinecek Todo bulunamadı.");
    }
}

function searchTodos(e){
    const filter = e.target.value.toLowerCase().trim();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function(todo){
        if(todo.textContent.toLowerCase().trim().includes(filter)){
            todo.setAttribute("style","display : flex !important");
        }
        else{
            todo.setAttribute("style","display : none !important");
        }
    });
}
