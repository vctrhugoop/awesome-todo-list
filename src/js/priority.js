export function priority() {
  const buttonPriority = document.querySelectorAll('.tag');
  const tagPriority = document.querySelectorAll('.tag span');
  const priorityBox = document.querySelectorAll('.priority');

  for (let i = 0; i < priorityBox.length; i++) {
    buttonPriority[i].addEventListener('click', () => {
      priorityBox[i].classList.toggle('hide');
      priorityBox[i].addEventListener('click', e => {
        if (e.target.tagName === 'P') {
          const tag = e.target.innerText;
          tagPriority[i].textContent = tag;

          switch (tagPriority[i].textContent) {
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
