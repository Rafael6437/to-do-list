const tasksContainer = document.querySelector('.tasks');
const addTaskBtn = document.getElementById('add-task-btn');
const subjectInput = document.querySelector('.date-input');

// Função para criar tarefa no DOM
function createTask(text = '') {
  // Criar elementos

  //Cria uma div
  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');

  //Cria um input com o type checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  //Cria um input com o type text
  const taskText = document.createElement('input');
  taskText.type = 'text';
  taskText.placeholder = 'Nova tarefa';
  taskText.value = text;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '✖'; // um X para remover
  removeBtn.style.marginLeft = 'auto';
  removeBtn.style.background = 'transparent';
  removeBtn.style.border = 'none';
  removeBtn.style.cursor = 'pointer';
  removeBtn.style.fontSize = '1.2rem';
  removeBtn.style.color = '#61715b';

  // Adiciona evento para remover tarefa
  removeBtn.addEventListener('click', () => {
    tasksContainer.removeChild(taskItem);
    saveTasks();
  });

  // Adiciona evento para salvar quando checkbox mudar
  checkbox.addEventListener('change', saveTasks);
  // Salva também quando editar o texto
  taskText.addEventListener('input', saveTasks);

  // Monta estrutura
  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskText);
  taskItem.appendChild(removeBtn);

  // Adiciona no container
  tasksContainer.appendChild(taskItem);
}

// Função para salvar no localStorage
function saveTasks() {
  const tasks = [];
  const items = tasksContainer.querySelectorAll('.task-item');
  items.forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const text = item.querySelector('input[type="text"]').value;
    tasks.push({ text, done: checkbox.checked });
  });
  localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

// Função para carregar tarefas do localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('todoTasks'));
  if (!tasks) return;
  tasks.forEach(task => {
    createTask(task.text);
    // Depois que criar, setar o checkbox:
    const lastTask = tasksContainer.lastChild;
    lastTask.querySelector('input[type="checkbox"]').checked = task.done;
  });
}

// Evento do botão para adicionar tarefa
addTaskBtn.addEventListener('click', () => {
  createTask();
  saveTasks();
});

// Carregar tarefas salvas ao carregar página
window.addEventListener('load', () => {
  loadTasks();
});