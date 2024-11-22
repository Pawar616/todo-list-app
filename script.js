const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const filter = document.getElementById('filter');

let tasks = [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        if (filter.value === 'all' || (filter.value === 'completed' && task.completed) || (filter.value === 'pending' && !task.completed)) {
            const li = document.createElement('li');
            li.textContent = `${task.text} - ${task.date}`;
            li.className = task.completed ? 'completed' : '';
            li.addEventListener('click', () => {
                task.completed = !task.completed;
                renderTasks();
            });
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                tasks.splice(index, 1);
                renderTasks();
            });
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        }
    });
}

addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value;
    const taskDueDate = taskDate.value;
    if (taskText && taskDueDate) {
        tasks.push({ text: taskText, date: taskDueDate, completed: false });
        taskInput.value = '';
        taskDate.value = '';
        renderTasks();
    }
});

filter.addEventListener('change', renderTasks);
