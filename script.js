// Sample data structure for tasks
let tasks = [
    {
        id: 1,
        title: "Shopping",
        completed: false,
        expanded: false,
        subtasks: [
            { id: 11, title: "Buy potatoes", completed: false },
            { id: 12, title: "Buy meat", completed: true },
            { id: 13, title: "Buy vegetables", completed: false },
            { id: 14, title: "Buy dairy products", completed: false }
        ]
    },
    {
        id: 2,
        title: "Home Renovation",
        completed: false,
        expanded: false,
        subtasks: [
            { id: 21, title: "Paint living room", completed: true },
            { id: 22, title: "Install new flooring", completed: false },
            { id: 23, title: "Replace light fixtures", completed: true },
            { id: 24, title: "Organize storage", completed: false }
        ]
    },
    {
        id: 3,
        title: "Work Project",
        completed: false,
        expanded: false,
        subtasks: [
            { id: 31, title: "Research requirements", completed: true },
            { id: 32, title: "Create wireframes", completed: true },
            { id: 33, title: "Develop prototype", completed: false },
            { id: 34, title: "Test functionality", completed: false },
            { id: 35, title: "Deploy to production", completed: false }
        ]
    }
];

function calculateProgress(task) {
    if (!task.subtasks || task.subtasks.length === 0) {
        return task.completed ? 100 : 0;
    }
    
    const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
    return Math.round((completedSubtasks / task.subtasks.length) * 100);
}

function updateTaskCompletion(task) {
    if (task.subtasks && task.subtasks.length > 0) {
        const progress = calculateProgress(task);
        task.completed = progress === 100;
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        updateTaskCompletion(task);
        const progress = calculateProgress(task);
        
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        taskElement.innerHTML = `
            <div class="task-header" onclick="toggleTask(${task.id})">
                <span class="task-toggle ${task.subtasks && task.subtasks.length > 0 ? (task.expanded ? 'expanded' : '') : 'hidden'}" id="toggle-${task.id}">▶</span>
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                       onchange="toggleTaskCompletion(${task.id})" onclick="event.stopPropagation()">
                <span class="task-title ${task.completed ? 'completed' : ''}">${task.title}</span>
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill ${progress === 100 ? 'completed' : ''}" 
                             style="width: ${progress}%"></div>
                    </div>
                    <div class="progress-text">${progress}%</div>
                </div>
            </div>
            ${task.subtasks && task.subtasks.length > 0 ? `
                <div class="subtasks ${task.expanded ? 'expanded' : ''}" id="subtasks-${task.id}">
                    ${task.subtasks.map(subtask => `
                        <div class="subtask-item">
                            <input type="checkbox" class="subtask-checkbox" ${subtask.completed ? 'checked' : ''}
                                   onchange="toggleSubtaskCompletion(${task.id}, ${subtask.id})">
                            <span class="subtask-title ${subtask.completed ? 'completed' : ''}">${subtask.title}</span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        `;
        
        taskList.appendChild(taskElement);
    });
}

function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.expanded = !task.expanded;
        
        // Update the visual state smoothly without re-rendering
        const subtasks = document.getElementById(`subtasks-${taskId}`);
        const toggle = document.getElementById(`toggle-${taskId}`);
        
        if (subtasks && toggle) {
            if (task.expanded) {
                subtasks.classList.add('expanded');
                toggle.classList.add('expanded');
            } else {
                subtasks.classList.remove('expanded');
                toggle.classList.remove('expanded');
            }
        }
    }
}

function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        
        // If main task is manually completed, mark all subtasks as completed
        if (task.completed && task.subtasks) {
            task.subtasks.forEach(subtask => subtask.completed = true);
        }
        // If main task is manually uncompleted, mark all subtasks as uncompleted
        else if (!task.completed && task.subtasks) {
            task.subtasks.forEach(subtask => subtask.completed = false);
        }
        
        renderTasks();
    }
}

function toggleSubtaskCompletion(taskId, subtaskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.subtasks) {
        const subtask = task.subtasks.find(s => s.id === subtaskId);
        if (subtask) {
            subtask.completed = !subtask.completed;
            
            // Update only the specific subtask's visual state
            updateSubtaskVisualState(taskId, subtaskId, subtask.completed);
            
            // Update the main task's completion status and progress
            updateTaskCompletion(task);
            updateTaskProgress(taskId, task);
        }
    }
}

function showAddTaskModal() {
    const modal = document.getElementById('addTaskModal');
    modal.classList.add('active');
    document.getElementById('taskTitle').focus();
}

function closeAddTaskModal() {
    const modal = document.getElementById('addTaskModal');
    modal.classList.remove('active');
    
    // Reset form
    document.getElementById('addTaskForm').reset();
    document.getElementById('subtasksSection').style.display = 'none';
    document.getElementById('subtasksList').innerHTML = '';
}

function toggleSubtasksSection() {
    const checkbox = document.getElementById('hasSubtasks');
    const section = document.getElementById('subtasksSection');
    
    if (checkbox.checked) {
        section.style.display = 'block';
        addSubtaskInput(); // Add the first subtask input
    } else {
        section.style.display = 'none';
        document.getElementById('subtasksList').innerHTML = '';
    }
}

function addSubtaskInput() {
    const subtasksList = document.getElementById('subtasksList');
    const subtaskCount = subtasksList.children.length;
    
    const subtaskDiv = document.createElement('div');
    subtaskDiv.className = 'subtask-input-group';
    subtaskDiv.innerHTML = `
        <input type="text" class="subtask-input" placeholder="Enter subtask title..." data-index="${subtaskCount}">
        <button type="button" class="remove-subtask-btn" onclick="removeSubtaskInput(this)">×</button>
    `;
    
    subtasksList.appendChild(subtaskDiv);
    
    // Focus the new input
    subtaskDiv.querySelector('.subtask-input').focus();
}

function removeSubtaskInput(button) {
    button.parentElement.remove();
}

function addNewTask() {
    const titleInput = document.getElementById('taskTitle');
    const title = titleInput.value.trim();
    
    if (!title) {
        alert('Please enter a task title.');
        titleInput.focus();
        return;
    }
    
    const newTask = {
        id: Date.now(),
        title: title,
        completed: false,
        expanded: false,
        subtasks: []
    };
    
    // Collect subtasks if any
    const hasSubtasks = document.getElementById('hasSubtasks').checked;
    if (hasSubtasks) {
        const subtaskInputs = document.querySelectorAll('.subtask-input');
        subtaskInputs.forEach((input, index) => {
            const subtaskTitle = input.value.trim();
            if (subtaskTitle) {
                newTask.subtasks.push({
                    id: Date.now() + index + Math.random(),
                    title: subtaskTitle,
                    completed: false
                });
            }
        });
    }
    
    tasks.push(newTask);
    renderTasks();
    closeAddTaskModal();
}

function updateSubtaskVisualState(taskId, subtaskId, completed) {
    // Find the specific subtask element and update its visual state
    const subtaskElements = document.querySelectorAll(`#subtasks-${taskId} .subtask-item`);
    const subtask = tasks.find(t => t.id === taskId).subtasks.find(s => s.id === subtaskId);
    const subtaskIndex = tasks.find(t => t.id === taskId).subtasks.indexOf(subtask);
    
    if (subtaskElements[subtaskIndex]) {
        const checkbox = subtaskElements[subtaskIndex].querySelector('.subtask-checkbox');
        const title = subtaskElements[subtaskIndex].querySelector('.subtask-title');
        
        checkbox.checked = completed;
        if (completed) {
            title.classList.add('completed');
        } else {
            title.classList.remove('completed');
        }
    }
}

function updateTaskProgress(taskId, task) {
    const progress = calculateProgress(task);
    const progressFill = document.querySelector(`#toggle-${taskId}`).parentElement.querySelector('.progress-fill');
    const progressText = document.querySelector(`#toggle-${taskId}`).parentElement.querySelector('.progress-text');
    const taskCheckbox = document.querySelector(`#toggle-${taskId}`).parentElement.querySelector('.task-checkbox');
    const taskTitle = document.querySelector(`#toggle-${taskId}`).parentElement.querySelector('.task-title');
    
    // Update progress bar
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;
    
    // Update progress bar color
    if (progress === 100) {
        progressFill.classList.add('completed');
    } else {
        progressFill.classList.remove('completed');
    }
    
    // Update main task checkbox and title
    taskCheckbox.checked = task.completed;
    if (task.completed) {
        taskTitle.classList.add('completed');
    } else {
        taskTitle.classList.remove('completed');
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
    
    // Add form submit event listener
    document.getElementById('addTaskForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addNewTask();
    });
    
    // Close modal when clicking outside
    document.getElementById('addTaskModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeAddTaskModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('addTaskModal').classList.contains('active')) {
            closeAddTaskModal();
        }
    });
}); 