const concluded = document.getElementsByClassName('task-wrapper');
const buttonCheck = document.getElementsByClassName('btn-check');
const changeIconFill = document.querySelectorAll('.btn-check .ph');
const changeIconCheck = document.querySelectorAll('.btn-check .ph-circle');

for (let i = 0; i < concluded.length; i++) {
  buttonCheck[i].addEventListener('click', () => {
    concluded[i].classList.toggle('concluded');
    changeIconFill[i].classList.toggle('ph-fill');
    changeIconCheck[i].classList.toggle('ph-circle');
    changeIconCheck[i].classList.toggle('ph-check-circle');

    console.log(concluded[i]);
  });
}
