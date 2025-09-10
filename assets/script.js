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

  //Cria um X para que possa ser removida a task
  const removeBtn = document.createElement('button');
  removeBtn.textContent = '✖'; // um X para remover
  removeBtn.style.marginLeft = 'auto';
  removeBtn.style.background = 'transparent';
  removeBtn.style.border = 'none';
  removeBtn.style.cursor = 'pointer';
  removeBtn.style.fontSize = '1.2rem';
  removeBtn.style.color = '#61715b';

  //Cria um button para "confirmar" tarefa
  const confirmTask = document.createElement('button');
  confirmTask.textContent = '✔';

  //Evento de transformar o input em paragrafo
  confirmTask.addEventListener('click', () => {
    const p = document.createElement('p');
    p.textContent = taskText.value;
    taskText.replaceWith(p);
    confirmTask.remove();

      //Evento para riscar o texto concluido
    checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      p.style.textDecoration = 'line-through';
    } else {
       p.style.textDecoration = 'none'
      }
})
  })

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
  taskItem.appendChild(confirmTask);
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