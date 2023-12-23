import { NewTaskView } from './NewTask.js';
import { concluded } from './concluded.js';
import { priority } from './priority.js';
import { search } from './Search.js';
import './showInput.js';
import './createTask.js';

new NewTaskView('#app');
concluded();
priority();
search();
