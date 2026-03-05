
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCounter = document.getElementById('task-counter');


let taskCount = 0;


function updateTaskCounter() {
  taskCounter.textContent = taskCount;
}


taskForm.addEventListener('submit', function(event) {
  event.preventDefault(); 

  
  const taskText = taskInput.value;

  
  const li = document.createElement('li');
  li.textContent = taskText;


  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Eliminar';
  deleteButton.addEventListener('click', function() {
    taskList.removeChild(li); 
    taskCount--;
    updateTaskCounter(); 
  });

  
  li.appendChild(deleteButton);

 
  taskList.appendChild(li);


  taskInput.value = '';


  taskCount++;
  updateTaskCounter();
});