export class NewTask {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@tasks:')) || [];
  }

  save() {
    localStorage.setItem('@tasks:', JSON.stringify(this.entries));
  }

  add(entrie) {
    this.entries = [entrie, ...this.entries];
    this.update();
    this.save();
  }

  delete(data, task) {
    const filteredEntries = this.entries.filter(
      entry => entry.title !== data.title
    );
    this.entries = filteredEntries;
    task.remove();
    this.update();
    this.save();
  }
}

export class NewTaskView extends NewTask {
  constructor(root) {
    super(root);

    this.taskList = this.root.querySelector('main .task-list ul');

    this.update();
    this.getData();
  }

  update() {
    this.emptyState();

    this.removeAllTaskList();

    this.entries.forEach(data => {
      const task = this.createTask({
        priority: data.priority,
        isCompleted: data.isCompleted,
      });

      task.querySelector('.text h3').textContent = data.title;
      task.querySelector('.text p').textContent = data.description;

      task.querySelector('.btn-remove').onclick = () => {
        const isOk = confirm('Tem certeza que deseja remover essa terefa?');

        if (isOk) {
          this.delete(data, task);
        }
      };

      this.taskList.appendChild(task);
    });

    this.countTasks();
    this.priority();
    this.search();
  }

  createTask(status) {
    const { priority, isCompleted } = status;
    const createlist = document.createElement('li');

    createlist.setAttribute('class', `task-wrapper`);

    createlist.innerHTML = `
        <div class="content">
          <button class="btn-check">
          <i class="ph ph-circle"></i>
          <i class="ph-fill ph-check-circle hide"></i></button>
          <div class="text">
            <h3></h3>
            <p>
            </p>
          </div>
        </div>
        <div class="utils">
          <button class="tag">
            <i class="ph-fill ph-tag"></i>
            <span>Adicione uma prioridade</span>
          </button>
          <div class="btn-utils">
            <button class="btn-edit">
              <i class="ph ph-pencil-simple"></i>
            </button>
            <button class="btn-remove">
              <i class="ph ph-trash"></i>
            </button>
          </div>
        </div>
      <div class="priority hide">
        <div class="priority-list">
          <div class="list-item">
            <div class="tag-icon tag-low"><i class="ph-fill ph-tag-simple"></i></div>
            <p>BAIXA</p>
          </div>
          <div class="list-item">
            <div class="tag-icon tag-medium">
              <i class="ph-fill ph-tag-simple"></i>
            </div>
            <p>MÉDIA</p>
          </div>
          <div class="list-item">
            <div class="tag-icon tag-high">
              <i class="ph-fill ph-tag-simple"></i>
            </div>
            <p>ALTA</p>
          </div>
          <div class="list-item">
            <div class="tag-icon tag-remove">
            <i class="ph ph-x"></i>
            </div>
              <p>Remover prioridade</p>
          </div>
        </div>
      </div>`;

    return createlist;
  }

  getData() {
    const form = document.querySelector('form');
    const inputTaskTitle = document.querySelector('#task-title');
    const inputTaskDescription = document.querySelector('#task-description');

    form.addEventListener('submit', e => {
      e.preventDefault();

      const title = inputTaskTitle.value;
      const description = inputTaskDescription.value;

      const entrie = {
        title: title,
        description: description,
        priority: null,
        isCompleted: false,
      };

      this.add(entrie);
      document.querySelector('.input-wrapper').classList.add('hide');

      inputTaskTitle.value = '';
      inputTaskDescription.value = '';
    });
  }

  removeAllTaskList() {
    this.taskList.querySelectorAll('li').forEach(list => {
      list.remove();
    });
  }

  countTasks() {
    const createdTask = document.querySelectorAll('.task-wrapper');
    const buttonCheck = document.querySelectorAll('.btn-check');
    const changeIconRegular = document.querySelectorAll('.btn-check .ph');
    const changeIconFill = document.querySelectorAll('.btn-check .ph-fill');
    const countCreated = document.querySelector('.created-task span');
    const countConcluded = document.querySelector('.concluded-task span');

    countCreated.textContent = createdTask.length;

    countConcluded.textContent = `0
    de ${createdTask.length}`;

    for (let i = 0; i < createdTask.length; i++) {
      buttonCheck[i].addEventListener('click', () => {
        createdTask[i].classList.toggle('concluded');
        if (createdTask[i].classList.contains('concluded')) {
          changeIconRegular[i].classList.add('hide');
          changeIconFill[i].classList.remove('hide');
        } else {
          changeIconRegular[i].classList.remove('hide');
          changeIconFill[i].classList.add('hide');
        }

        this.entries[i].isCompleted = !this.entries[i].isCompleted;

        countConcluded.textContent = `${
          document.querySelectorAll('.concluded').length
        } de ${createdTask.length}`;

        this.save();
      });

      if (this.entries[i].isCompleted) {
        createdTask[i].classList.add('concluded');
        changeIconRegular[i].classList.add('hide');
        changeIconFill[i].classList.remove('hide');

        countConcluded.textContent = `${
          document.querySelectorAll('.concluded').length
        } de ${createdTask.length}`;
      }
    }
  }

  priority() {
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
                buttonPriority[i].classList.remove('medium', 'high');
                priorityBox[i].classList.add('hide');
                this.entries[i].priority = tagPriority[i].textContent;
                break;

              case 'MÉDIA':
                buttonPriority[i].classList.add('medium');
                buttonPriority[i].classList.remove('low', 'high');
                priorityBox[i].classList.add('hide');
                this.entries[i].priority = tagPriority[i].textContent;
                break;

              case 'ALTA':
                buttonPriority[i].classList.add('high');
                buttonPriority[i].classList.remove('medium', 'low');
                priorityBox[i].classList.add('hide');
                this.entries[i].priority = tagPriority[i].textContent;
                break;
              default:
                buttonPriority[i].classList.add('default');
                buttonPriority[i].classList.remove('high', 'medium', 'low');
                priorityBox[i].classList.add('hide');
                tagPriority[i].textContent = 'Adicione uma prioridade';
                this.entries[i].priority = null;
                break;
            }

            this.save();
          }
        });
      });

      if (this.entries[i].priority === 'BAIXA') {
        tagPriority[i].textContent = 'BAIXA';
        buttonPriority[i].classList.add('low');
      } else if (this.entries[i].priority === 'MÉDIA') {
        tagPriority[i].textContent = 'MÉDIA';
        buttonPriority[i].classList.add('medium');
      } else if (this.entries[i].priority === 'ALTA') {
        tagPriority[i].textContent = 'ALTA';
        buttonPriority[i].classList.add('high');
      }

      document.addEventListener('click', e => {
        if (
          !priorityBox[i].contains(e.target) &&
          !buttonPriority[i].contains(e.target)
        ) {
          priorityBox[i].classList.add('hide');
        }
      });

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          e.preventDefault();
          priorityBox[i].classList.add('hide');
        }
      });
    }
  }

  search() {
    const filterElement = document.querySelector('#search-task');

    const tasks = document.querySelectorAll('.task-wrapper');

    filterElement.addEventListener('input', () => {
      if (filterElement.value != '') {
        for (let task of tasks) {
          let title = task.querySelector('h3');
          let description = task.querySelector('p');
          title = title.textContent.toLowerCase();
          description = description.textContent.toLowerCase();

          let filterText = filterElement.value.toLowerCase();

          if (
            !title.includes(filterText) &&
            !description.includes(filterText)
          ) {
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

  edit() {
    const buttonEdit = document.querySelectorAll('.btn-edit');
  }

  emptyState() {
    if (this.entries.length === 0) {
      this.root.querySelector('.empty').classList.remove('hide');
      this.root.querySelector('.task-list').classList.add('hide');
    } else {
      this.root.querySelector('.empty').classList.add('hide');
      this.root.querySelector('.task-list').classList.remove('hide');
    }
  }
}
