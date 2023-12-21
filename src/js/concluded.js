export function concluded() {
  const createdTask = document.querySelectorAll('.task-wrapper');
  const buttonCheck = document.querySelectorAll('.btn-check');
  const changeIconFill = document.querySelectorAll('.btn-check .ph');
  const changeIconCheck = document.querySelectorAll('.btn-check .ph-circle');
  const countCreated = document.querySelector('.created-task span');
  const countConcluded = document.querySelector('.concluded-task span');

  countCreated.textContent = createdTask.length;

  countConcluded.textContent = `0
  de ${createdTask.length}`;

  for (let i = 0; i < createdTask.length; i++) {
    buttonCheck[i].addEventListener('click', () => {
      createdTask[i].classList.toggle('concluded');
      changeIconFill[i].classList.toggle('ph-fill');
      changeIconCheck[i].classList.toggle('ph-circle');
      changeIconCheck[i].classList.toggle('ph-check-circle');

      countConcluded.textContent = `${
        document.querySelectorAll('.concluded').length
      } de ${createdTask.length}`;
    });
  }
}
