export function priority() {
  const buttonPriority = document.querySelectorAll('.tag');
  const priorityBox = document.querySelectorAll('.priority');

  for (let i = 0; i < priorityBox.length; i++) {
    buttonPriority[i].addEventListener('click', () => {
      priorityBox[i].classList.toggle('hide');
    });
  }
}
