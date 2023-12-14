const addNewTaskButton = document.getElementById('btn-new-task');
const newTaskInput = document.querySelector('.input-wrapper');

addNewTaskButton.addEventListener('click', () => {
  newTaskInput.classList.remove('hide');
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    e.preventDefault();
    newTaskInput.classList.add('hide');
  }
});
