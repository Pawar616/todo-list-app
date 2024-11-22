const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const filter = document.getElementById('filter');
const categorySelect = document.getElementById('category');
const prioritySelect = document.getElementById('priority');
const searchInput = document.getElementById('search');

let tasks = [];

function renderTasks() {
    taskList.innerHTML = '';
    const searchTerm = searchInput.value.toLowerCase();
    
    // Sort tasks by priority
    tasks.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    tasks.forEach((task, index) => {
        if ((filter.value === 'all' || (filter.value === 'completed' && task.completed) || (filter.value === 'pending' && !task.completed)) &&
            (categorySelect.value === 'all' || task.category === categorySelect.value) &&
            (task.text.toLowerCase().includes(searchTerm))) {
            const li = document.createElement('li');
            li.textContent = `${task.text} - ${task.date} [${task.category}]`;
            li.className = task.completed ? 'completed' : '';
            li.style.color = task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green';
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
    const taskCategory = categorySelect.value;
    const taskPriority = prioritySelect.value;
    if (taskText && taskDueDate) {
        tasks.push({ text: taskText, date: taskDueDate, category: taskCategory, priority: taskPriority, completed: false });
        taskInput.value = '';
        taskDate.value = '';
        renderTasks();
    }
});

filter.addEventListener('change', renderTasks);
categorySelect.addEventListener('change', renderTasks);
prioritySelect.addEventListener('change', renderTasks);
searchInput.addEventListener('input', renderTasks);
