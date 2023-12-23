export class NewTask {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
    this.create();
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@tasks:')) || [
      {
        title: 'teste',
        description: 'test',
      },
      {
        title: 'teste',
        description: 'test',
      },
    ];
  }

  add(entrie) {
    this.entries = [entrie, ...this.entries];
  }

  delete(data) {
    const filteredEntries = this.entries.filter(
      entry => entry.title !== data.title
    );
    this.entries = filteredEntries;
    this.update();
  }
}

export class NewTaskView extends NewTask {
  constructor(root) {
    super(root);

    this.taskList = this.root.querySelector('main .task-list ul');

    this.update();
  }

  update() {
    this.emptyState();

    this.removeAllTaskList();

    this.entries.forEach(data => {
      const task = this.createTask();

      task.querySelector('.text h3').textContent = data.title;
      task.querySelector('.text p').textContent = data.description;

      task.querySelector('.btn-remove').onclick = () => {
        const isOk = confirm('Tem cerzeta que deseja remover essa terefa?');

        if (isOk) {
          this.delete(data);
        }
      };

      this.taskList.append(task);
    });
  }

  createTask() {
    const createlist = Object.assign(document.createElement('li'), {
      classList: ['task-wrapper'],
    });

    createlist.innerHTML = `
        <div class="content">
          <button class="btn-check"><i class="ph ph-circle"></i></button>
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

  create() {
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
      };

      this.add(entrie);
      document.querySelector('.input-wrapper').classList.add('hide');

      inputTaskTitle.value = '';
      inputTaskDescription.value = '';
    });
  }

  removeAllTaskList() {
    this.taskList.querySelectorAll('ul').forEach(list => {
      list.remove();
    });
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
