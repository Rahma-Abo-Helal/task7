let todoItems = [];
function addTodo(text) {
const todo = {
text,
checked: false,
id: Date.now()
};
todoItems.push(todo);
console.log(todoItems);
renderTodo(todo);
}
const form = document.querySelector('.todos-form');
console.log("form : " + form);
form.addEventListener('submit', event => {
event.preventDefault();
const input = document.querySelector('input');
const text = input.value.trim();
if (text !== '') {
addTodo(text);
input.value = '';
input.focus();
}
});
function renderTodo(todo) {
const list = document.querySelector('.todos-list');
console.log("id-renderTodo: " + todo.id);


const item = document.getElementById('' + todo.id);
const node = document.createElement('div');
node.setAttribute('id', todo.id);
node.setAttribute('class', 'list')
node.innerHTML = `
<input type="checkbox" class="checkbox" id="checkbox-${todo.id}" name="${todo.id}">
<label class="todos-list__li" for="${todo.id}">
<div class="todos-list__li-icon">
<img src="/img/checkbox.svg" alt="checkbox" class="todos-list__li-icon-1"/>
<svg class="todos-list__li-icon-2" width="28" height="22" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="tick" d="M2 14.2807L9.81268 22L28 2" stroke="url(#paint0_linear)" stroke-width="3.2"/>
<defs>
<linearGradient id="paint0_linear" x1="28" y1="2" x2="-4.65091" y2="11.0317" gradientUnits="userSpaceOnUse">
<stop stop-color="#01A7DC"/>
<stop offset="1" stop-color="#41C5EF" stop-opacity="0.85"/>
</linearGradient>
</defs>
</svg>
</div>
<div class="todos-list__li-text">
<div class = "todos-list__li-text-1"> ${todo.text}</div>
<svg class="todos-list__li-text-2" width="170" height="4" viewBox="0 0 194 4" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="line" d="M0 2L194 2" stroke="url(#paint0_linear)" stroke-width="3.2"/>
<defs>
<linearGradient id="paint0_linear" x1="194" y1="2.00012" x2="0" y2="2.00003" gradientUnits="userSpaceOnUse">
<stop stop-color="#7DCEE8"/>
<stop offset="1" stop-color="#30BDEA"/>
</linearGradient>
</defs>
</svg>
</div>
<button class="todos-list__li-delete-todo "><i class="fa fa-trash"></i> </button>
</label>
`;
console.log(node);
list.append(node);
}

const list = document.querySelector('.todos-list');

list.addEventListener('click', event => {
console.log("Event :" + event);
if (event.target.classList.contains('todos-list__li-delete-todo')) {
const itemKey = event.target.parentNode.parentNode.id;
console.log("delete - " + event.target.parentNode.parentNode.id);
console.log("delete : " + itemKey);
deleteTodo(itemKey);
}
else if (event.target.parentNode.classList.contains('todos-list__li-delete-todo')) {
const itemKey = event.target.parentNode.parentNode.parentNode.id;
console.log("delete - " + event.target.parentNode.parentNode.parentNode.id);
console.log("delete : " + itemKey);
deleteTodo(itemKey);
}
else if (event.target.classList.contains('todos-list__li-text') ||
event.target.classList.contains('todos-list__li-icon')) {
const itemKey = event.target.parentNode.parentNode.id;
toggleDone(itemKey);
if (event.target.parentNode.parentNode.classList.contains('checked')) {
document.getElementById("checkbox-" + itemKey).checked = true;
}
else {
event.target.style.textDecoration = "none";
document.getElementById("checkbox-" + itemKey).checked = false;
}
}
else {
const itemKey = event.target.parentNode.parentNode.parentNode.id;
toggleDone(itemKey);
if (event.target.parentNode.parentNode.parentNode.classList.contains('checked')) {
document.getElementById("checkbox-" + itemKey).checked = true;
}
else {
document.getElementById("checkbox-" + itemKey).checked = false;
}
}
});
function toggleDone(key) {

const index = todoItems.findIndex(item => item.id === Number(key));

todoItems[index].checked = !todoItems[index].checked;
document.getElementById(todoItems[index].id).classList.toggle('checked');
console.log('Checked : ' + todoItems[index].checked);
}
function deleteTodo(key) {
const index = todoItems.findIndex(item => item.id === Number(key));
const todo = {
deleted: true,
...todoItems[index]
};
document.getElementById(key).classList.add('remove');


document.getElementById(key).addEventListener("transitionend", function () {
document.getElementById(key).remove();
todoItems = todoItems.filter(item => item.id !== Number(key));
});
}