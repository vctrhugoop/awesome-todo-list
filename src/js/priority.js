export function priority() {
  const buttonPriority = document.querySelectorAll('.tag');
  const tagPriority = document.querySelector('.tag span');
  const priorityBox = document.querySelectorAll('.priority');

  for (let i = 0; i < priorityBox.length; i++) {
    buttonPriority[i].addEventListener('click', () => {
      priorityBox[i].classList.toggle('hide');
      window.addEventListener('click', e => {
        if (e.target.tagName === 'P') {
          const tag = e.target.innerText;
          tagPriority.textContent = tag;

          switch (tagPriority.textContent) {
            case 'BAIXA':
              buttonPriority[i].classList.add('low');
              buttonPriority[i].classList.remove('medium');
              buttonPriority[i].classList.remove('high');
              priorityBox[i].classList.add('hide');
              break;

            case 'MÉDIA':
              buttonPriority[i].classList.add('medium');
              buttonPriority[i].classList.remove('low');
              buttonPriority[i].classList.remove('high');
              priorityBox[i].classList.add('hide');
              break;

            case 'ALTA':
              buttonPriority[i].classList.add('high');
              buttonPriority[i].classList.remove('medium');
              buttonPriority[i].classList.remove('low');
              priorityBox[i].classList.add('hide');
              break;
          }
        }
      });
    });

    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        priorityBox[i].classList.add('hide');
      }
    });
  }
}
