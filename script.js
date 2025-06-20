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
    },
    {
        id: 4,
        title: "Read 20 Books",
        completed: false,
        expanded: false,
        weightedMode: false,
        weight: 0,
        subtasks: [
            { id: 41, title: "Read Book 1", completed: false, weight: 0 },
            { id: 42, title: "Read Book 2", completed: false, weight: 0 },
            { id: 43, title: "Read Book 3", completed: false, weight: 0 },
            { id: 44, title: "Read Book 4", completed: false, weight: 0 },
            { id: 45, title: "Read Book 5", completed: false, weight: 0 },
            { id: 46, title: "Read Book 6", completed: false, weight: 0 },
            { id: 47, title: "Read Book 7", completed: false, weight: 0 },
            { id: 48, title: "Read Book 8", completed: false, weight: 0 },
            { id: 49, title: "Read Book 9", completed: false, weight: 0 },
            { id: 410, title: "Read Book 10", completed: false, weight: 0 },
            { id: 411, title: "Read Book 11", completed: false, weight: 0 },
            { id: 412, title: "Read Book 12", completed: false, weight: 0 },
            { id: 413, title: "Read Book 13", completed: false, weight: 0 },
            { id: 414, title: "Read Book 14", completed: false, weight: 0 },
            { id: 415, title: "Read Book 15", completed: false, weight: 0 },
            { id: 416, title: "Read Book 16", completed: false, weight: 0 },
            { id: 417, title: "Read Book 17", completed: false, weight: 0 },
            { id: 418, title: "Read Book 18", completed: false, weight: 0 },
            { id: 419, title: "Read Book 19", completed: false, weight: 0 },
            { id: 420, title: "Read Book 20", completed: false, weight: 0 }
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
        const progressGradient = getProgressGradient(progress);
        
        // Check for celebration
        checkAndCelebrate(task);
        
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
                        <div class="progress-fill" 
                             style="width: ${progress}%; background: ${progressGradient}"></div>
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
    const progressGradient = getProgressGradient(progress);
    const progressFill = document.querySelector(`#toggle-${taskId}`).parentElement.querySelector('.progress-fill');
    const progressText = document.querySelector(`#toggle-${taskId}`).parentElement.querySelector('.progress-text');
    const taskCheckbox = document.querySelector(`#toggle-${taskId}`).parentElement.querySelector('.task-checkbox');
    const taskTitle = document.querySelector(`#toggle-${taskId}`).parentElement.querySelector('.task-title');
    
    // Update progress bar with dynamic color
    progressFill.style.width = `${progress}%`;
    progressFill.style.background = progressGradient;
    progressText.textContent = `${progress}%`;
    
    // Check for celebration
    checkAndCelebrate(task);
    
    // Update time info for weighted tasks
    if (task.weightedMode && task.subtasks && task.subtasks.length > 0) {
        const timeInfoElement = document.querySelector(`#toggle-${taskId}`).parentElement.querySelector('.time-info');
        if (timeInfoElement) {
            const totalTime = task.subtasks.reduce((sum, subtask) => sum + (subtask.weight || 0), 0);
            const completedTime = task.subtasks
                .filter(subtask => subtask.completed)
                .reduce((sum, subtask) => sum + (subtask.weight || 0), 0);
            timeInfoElement.textContent = `${completedTime}/${totalTime} min`;
        }
    }
    
    // Update main task checkbox and title
    taskCheckbox.checked = task.completed;
    if (task.completed) {
        taskTitle.classList.add('completed');
    } else {
        taskTitle.classList.remove('completed');
    }
}

function getProgressColorHSL(percent) {
    const clamped = Math.max(0, Math.min(100, percent)) / 100; // Convert to 0-1 range
    const hue = clamped * 120; // from 0 (red) to 120 (green)
    return `hsl(${hue}, 100%, 50%)`;
}

function getProgressGradient(percentage) {
    const baseColor = getProgressColorHSL(percentage);
    const clamped = Math.max(0, Math.min(100, percentage)) / 100;
    const hue = clamped * 120;
    
    // Create a subtle gradient effect using the calculated hue
    const lighterColor = `hsl(${hue}, 100%, 55%)`;
    const darkerColor = `hsl(${hue}, 100%, 45%)`;
    
    return `linear-gradient(90deg, ${lighterColor}, ${darkerColor})`;
}

function celebrateTaskCompletion(taskId, taskTitle) {
    const taskElement = document.querySelector(`#toggle-${taskId}`).closest('.task-item');
    const progressFill = document.querySelector(`#toggle-${taskId}`).parentElement.querySelector('.progress-fill');
    const progressContainer = document.querySelector(`#toggle-${taskId}`).parentElement.querySelector('.progress-container');
    
    // Add celebration class to task
    taskElement.classList.add('celebrating');
    
    // Green shine effect on progress bar (harmonizes with green completion color)
    progressFill.style.background = 'linear-gradient(90deg, #4CAF50, #45a049, #4CAF50)';
    progressFill.style.backgroundSize = '200% 100%';
    progressFill.style.animation = 'greenShine 1s ease-in-out infinite';
    
    // Add sparkle effect
    createSparkles(progressContainer);
    
    // Bounce animation for the entire task
    taskElement.style.animation = 'celebrationBounce 0.6s ease-in-out';
    
    // Reset after 7 seconds
    setTimeout(() => {
        taskElement.classList.remove('celebrating');
        progressFill.style.animation = '';
        progressFill.style.background = getProgressGradient(100); // Return to green
        progressFill.style.backgroundSize = '';
        taskElement.style.animation = '';
        
        // Remove sparkles
        const sparkles = progressContainer.querySelectorAll('.sparkle');
        sparkles.forEach(sparkle => sparkle.remove());
    }, 7000);
}

function createSparkles(container) {
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(sparkle);
    }
}

function checkAndCelebrate(task) {
    const progress = calculateProgress(task);
    if (progress === 100 && !task.celebrated) {
        task.celebrated = true;
        celebrateTaskCompletion(task.id, task.title);
    } else if (progress < 100) {
        task.celebrated = false; // Reset so it can celebrate again if completed later
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