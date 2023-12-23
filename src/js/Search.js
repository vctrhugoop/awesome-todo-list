export function search() {
  const filterElement = document.querySelector('#search-task');

  const tasks = document.querySelectorAll('.task-wrapper');

  filterElement.addEventListener('input', () => {
    if (filterElement.value != '') {
      for (let task of tasks) {
        let title = task.querySelector('h3');
        let description = task.querySelector('p');
        title = title.textContent.toLowerCase();
        description = description.textContent.toLowerCase();

        let filterText = filterElement.value;

        if (!title.includes(filterText) && !description.includes(filterText)) {
          task.style.display = 'none';
        } else {
          task.style.display = 'block';
        }
      }
    } else {
      for (let task of tasks) {
        task.style.display = 'block';
      }
    }
  });
}
