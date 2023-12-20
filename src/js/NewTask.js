export class NewTask {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    this.entries = [
      {
        title: 'Tarefa 1',
        description:
          'Lorem ipsum dolor sit amet. Et sunt voluptas sit fugiat voluptatem vel quia quisquam.',
      },
      {
        title: 'Tarefa 2',
        description:
          'Lorem ipsum dolor sit amet. Et sunt voluptas sit fugiat voluptatem vel quia quisquam.',
      },
      {
        title: 'Tarefa 3',
        description:
          'Lorem ipsum dolor sit amet. Et sunt voluptas sit fugiat voluptatem vel quia quisquam.',
      },
      {
        title: 'Tarefa 4',
        description:
          'Lorem ipsum dolor sit amet. Et sunt voluptas sit fugiat voluptatem vel quia quisquam.',
      },
      {
        title: 'Tarefa 5',
        description:
          'Lorem ipsum dolor sit amet. Et sunt voluptas sit fugiat voluptatem vel quia quisquam.',
      },
    ];
  }
}

export class NewTaskView extends NewTask {
  constructor(root) {
    super(root);

    this.taskList = this.root.querySelector('main .task-list');

    this.update();
  }

  update() {
    this.removeAllTaskList();

    this.entries.forEach(data => {
      const task = this.createTask();

      task.querySelector('.text h3').textContent = data.title;
      task.querySelector('.text p').textContent = data.description;

      this.taskList.append(task);
    });
  }

  createTask() {
    const createlist = document.createElement('ul');

    createlist.innerHTML = `
      <li class="task-wrapper">
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
      </li>
      <div class="priority hide">
        <div class="priority-list">
          <div class="list-item">
            <div class="cicle-low"></div>
            <p>BAIXA</p>
          </div>
          <div class="list-item">
            <div class="cicle-medium"></div>
            <p>MÉDIA</p>
          </div>
          <div class="list-item">
            <div class="cicle-high"></div>
            <p>ALTA</p>
          </div>
        </div>
      </div>`;

    return createlist;
  }

  removeAllTaskList() {
    this.taskList.querySelectorAll('ul').forEach(list => {
      list.remove();
    });
  }
}
