// These are the parts of our page we need to use
const textBox = document.getElementById("input");
const addButton = document.getElementById("add-btn");
const todoList = document.getElementById("list");


addButton.onclick = function () {

  var taskText = textBox.value;

  var newItem = document.createElement("li");
  newItem.textContent = taskText;


  todoList.appendChild(newItem);

  textBox.value = "";
};
