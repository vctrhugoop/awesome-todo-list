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
          ' Lorem ipsum dolor sit amet. Aut nihil temporibus ea voluptatum incidunt ad libero rerum ut rerum aliquam ut possimus aliquid ut quam optio et omnis consequatur. ',
      },
      {
        title: 'Tarefa 1',
        description:
          ' Lorem ipsum dolor sit amet. Aut nihil temporibus ea voluptatum incidunt ad libero rerum ut rerum aliquam ut possimus aliquid ut quam optio et omnis consequatur. ',
      },
    ];
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
            <div class="tag-icon tag-medium"><i class="ph-fill ph-tag-simple"></i></div>
            <p>MÉDIA</p>
          </div>
          <div class="list-item">
            <div class="tag-icon tag-high"><i class="ph-fill ph-tag-simple"></i></div>
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
