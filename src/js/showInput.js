const addNewTaskButton = document.getElementById('btn-new-task');
const cancelButton = document.getElementById('cancel-btn');
const closeButton = document.querySelector('.close');
const newTaskInput = document.querySelector('.input-wrapper');

addNewTaskButton.addEventListener('click', () => {
  newTaskInput.classList.remove('hide');
  newTaskInput.querySelector('input').focus();
});

cancelButton.addEventListener('click', () => {
  newTaskInput.classList.add('hide');
});

closeButton.addEventListener('click', () => {
  newTaskInput.classList.add('hide');
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    e.preventDefault();
    newTaskInput.classList.add('hide');
  }
});

window.addEventListener('mouseup', e => {
  if (e.target == newTaskInput) {
    newTaskInput.classList.add('hide');
  }
});
