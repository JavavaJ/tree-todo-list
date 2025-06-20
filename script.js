// Sample data structure for tasks
let tasks = [
    {
        id: 1,
        title: "Shopping",
        completed: false,
        expanded: false,
        weightedMode: false,
        weight: 0,
        subtasks: [
            { id: 11, title: "Buy potatoes", completed: false, weight: 0 },
            { id: 12, title: "Buy meat", completed: true, weight: 0 },
            { id: 13, title: "Buy vegetables", completed: false, weight: 0 },
            { id: 14, title: "Buy dairy products", completed: false, weight: 0 }
        ]
    },
    {
        id: 2,
        title: "Home Renovation",
        completed: false,
        expanded: false,
        weightedMode: true,
        weight: 0,
        subtasks: [
            { id: 21, title: "Paint living room", completed: true, weight: 120 },
            { id: 22, title: "Install new flooring", completed: false, weight: 300 },
            { id: 23, title: "Replace light fixtures", completed: true, weight: 45 },
            { id: 24, title: "Organize storage", completed: false, weight: 90 }
        ]
    },
    {
        id: 3,
        title: "Work Project",
        completed: false,
        expanded: false,
        weightedMode: false,
        weight: 0,
        subtasks: [
            { id: 31, title: "Research requirements", completed: true, weight: 0 },
            { id: 32, title: "Create wireframes", completed: true, weight: 0 },
            { id: 33, title: "Develop prototype", completed: false, weight: 0 },
            { id: 34, title: "Test functionality", completed: false, weight: 0 },
            { id: 35, title: "Deploy to production", completed: false, weight: 0 }
        ]
    }
];

function calculateProgress(task) {
    if (!task.subtasks || task.subtasks.length === 0) {
        return task.completed ? 100 : 0;
    }
    
    if (task.weightedMode) {
        // Calculate progress based on time weights
        const totalWeight = task.subtasks.reduce((sum, subtask) => sum + (subtask.weight || 0), 0);
        if (totalWeight === 0) {
            // Fallback to count-based if no weights assigned
            const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
            return Math.round((completedSubtasks / task.subtasks.length) * 100);
        }
        
        const completedWeight = task.subtasks
            .filter(subtask => subtask.completed)
            .reduce((sum, subtask) => sum + (subtask.weight || 0), 0);
        
        return Math.round((completedWeight / totalWeight) * 100);
    } else {
        // Calculate progress based on task count (original behavior)
        const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
        return Math.round((completedSubtasks / task.subtasks.length) * 100);
    }
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
        
        // Calculate total time for weighted tasks
        let timeInfo = '';
        if (task.weightedMode && task.subtasks && task.subtasks.length > 0) {
            const totalTime = task.subtasks.reduce((sum, subtask) => sum + (subtask.weight || 0), 0);
            const completedTime = task.subtasks
                .filter(subtask => subtask.completed)
                .reduce((sum, subtask) => sum + (subtask.weight || 0), 0);
            timeInfo = `<div class="time-info">${completedTime}/${totalTime} min</div>`;
        }
        
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        taskElement.innerHTML = `
            <div class="task-header" onclick="toggleTask(${task.id})">
                <span class="task-toggle ${task.subtasks && task.subtasks.length > 0 ? (task.expanded ? 'expanded' : '') : 'hidden'}" id="toggle-${task.id}">▶</span>
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                       onchange="toggleTaskCompletion(${task.id})" onclick="event.stopPropagation()">
                <span class="task-title ${task.completed ? 'completed' : ''}">${task.title}</span>
                ${task.weightedMode ? '<span class="weighted-badge">⏱️</span>' : ''}
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill ${progress === 100 ? 'completed' : ''}" 
                             style="width: ${progress}%"></div>
                    </div>
                    <div class="progress-text">${progress}%</div>
                    ${timeInfo}
                </div>
            </div>
            ${task.subtasks && task.subtasks.length > 0 ? `
                <div class="subtasks ${task.expanded ? 'expanded' : ''}" id="subtasks-${task.id}">
                    ${task.subtasks.map(subtask => `
                        <div class="subtask-item">
                            <input type="checkbox" class="subtask-checkbox" ${subtask.completed ? 'checked' : ''}
                                   onchange="toggleSubtaskCompletion(${task.id}, ${subtask.id})">
                            <span class="subtask-title ${subtask.completed ? 'completed' : ''}">${subtask.title}</span>
                            ${task.weightedMode && subtask.weight > 0 ? `<span class="subtask-weight">${subtask.weight} min</span>` : ''}
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
    document.getElementById('taskWeightSection').style.display = 'none';
    document.getElementById('useWeightedProgress').checked = false;
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

function toggleWeightedProgress() {
    const checkbox = document.getElementById('useWeightedProgress');
    const weightSection = document.getElementById('taskWeightSection');
    
    if (checkbox.checked) {
        weightSection.style.display = 'block';
    } else {
        weightSection.style.display = 'none';
        document.getElementById('taskWeight').value = '';
    }
    
    // Update subtask inputs if they exist
    updateSubtaskWeightInputs();
}

function updateSubtaskWeightInputs() {
    const useWeighted = document.getElementById('useWeightedProgress').checked;
    const subtaskInputs = document.querySelectorAll('.subtask-input-group');
    
    subtaskInputs.forEach(inputGroup => {
        const existingWeightInput = inputGroup.querySelector('.subtask-weight-input');
        
        if (useWeighted && !existingWeightInput) {
            // Add weight input
            const weightInput = document.createElement('input');
            weightInput.type = 'number';
            weightInput.className = 'subtask-weight-input';
            weightInput.placeholder = 'Time (min)';
            weightInput.min = '1';
            weightInput.style.width = '80px';
            weightInput.style.marginRight = '10px';
            
            const removeBtn = inputGroup.querySelector('.remove-subtask-btn');
            inputGroup.insertBefore(weightInput, removeBtn);
        } else if (!useWeighted && existingWeightInput) {
            // Remove weight input
            existingWeightInput.remove();
        }
    });
}

function addSubtaskInput() {
    const subtasksList = document.getElementById('subtasksList');
    const subtaskCount = subtasksList.children.length;
    const useWeighted = document.getElementById('useWeightedProgress').checked;
    
    const subtaskDiv = document.createElement('div');
    subtaskDiv.className = 'subtask-input-group';
    
    let weightInputHtml = '';
    if (useWeighted) {
        weightInputHtml = '<input type="number" class="subtask-weight-input" placeholder="Time (min)" min="1" style="width: 80px; margin-right: 10px;">';
    }
    
    subtaskDiv.innerHTML = `
        <input type="text" class="subtask-input" placeholder="Enter subtask title..." data-index="${subtaskCount}">
        ${weightInputHtml}
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
    
    const useWeighted = document.getElementById('useWeightedProgress').checked;
    const taskWeight = useWeighted ? parseInt(document.getElementById('taskWeight').value) || 0 : 0;
    
    const newTask = {
        id: Date.now(),
        title: title,
        completed: false,
        expanded: false,
        weightedMode: useWeighted,
        weight: taskWeight,
        subtasks: []
    };
    
    // Collect subtasks if any
    const hasSubtasks = document.getElementById('hasSubtasks').checked;
    if (hasSubtasks) {
        const subtaskInputs = document.querySelectorAll('.subtask-input');
        const weightInputs = document.querySelectorAll('.subtask-weight-input');
        
        subtaskInputs.forEach((input, index) => {
            const subtaskTitle = input.value.trim();
            if (subtaskTitle) {
                const subtaskWeight = useWeighted && weightInputs[index] ? 
                    parseInt(weightInputs[index].value) || 0 : 0;
                
                newTask.subtasks.push({
                    id: Date.now() + index + Math.random(),
                    title: subtaskTitle,
                    completed: false,
                    weight: subtaskWeight
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