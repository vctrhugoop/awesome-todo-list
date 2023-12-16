const addNewTaskButton = document.getElementById('btn-new-task');
const cancelButton = document.getElementById('cancel-btn');
const newTaskInput = document.querySelector('.input-wrapper');

addNewTaskButton.addEventListener('click', () => {
  newTaskInput.classList.remove('hide');
});

cancelButton.addEventListener('click', () => {
  newTaskInput.classList.add('hide');
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    e.preventDefault();
    newTaskInput.classList.add('hide');
  }
});
