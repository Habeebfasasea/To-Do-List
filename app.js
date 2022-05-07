// Define UI Vars
const form = document.querySelector('#todo-form');
const todoList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-todo');
const filter = document.querySelector('#filter');
const todoInput = document.querySelector('#todo');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTodos);
  // Add todo event
  form.addEventListener('submit', addTodo);
  // Remove todo event
  todoList.addEventListener('click', removeTodo);
  // Clear todo event
  clearBtn.addEventListener('click', clearTodos);
  // Filter todo event
  filter.addEventListener('keyup', filterTodos);
}

// Get Todo from LS
function getTodos() {
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function(todo){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'list-group-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(todo));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'fa fa-remove delete-item btn btn-danger float-right';
    // Add icon html
    //link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    todoList.appendChild(li);
  });
}

// Add Todo
function addTodo(e) {
  if(todoInput.value === '') {
    alert('Add a todo');
  }

  if(todoInput.value !== ''){
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'list-group-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(todoInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'fa fa-remove delete-item btn btn-danger float-right';
  // Add icon html
  //link.innerHTML = 'Delete';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  todoList.appendChild(li);

  // Store in LS
    storeTodoInLocalStorage(todoInput.value);
  }
  // Clear input
  todoInput.value = '';

  e.preventDefault();
}

// Store Todo
function storeTodoInLocalStorage(todo) {
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));
}

// Remove Todo
function removeTodo(e) {
  if(e.target.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.remove();

      // Remove from LS
      removeTodoFromLocalStorage(e.target.parentElement);
    }
  }
}

// Remove from LS
function removeTodoFromLocalStorage(todoItem) {
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function(todo, index){
    if(todoItem.textContent === todo){
      todos.splice(index, 1);
    }
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

// Clear Todo
function clearTodos() {
  // todoList.innerHTML = '';

  // Faster
  while(todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  // Clear from LS
  clearTodosFromLocalStorage();
}

// Clear Todo from LS
function clearTodosFromLocalStorage() {
  localStorage.clear();
}

// Filter Todo
function filterTodos(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.list-group-item').forEach(function(todo){
    const item = todo.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      todo.style.display = 'block';
    } else {
      todo.style.display = 'none';
    }
  });
}