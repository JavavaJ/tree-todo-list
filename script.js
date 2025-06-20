// Sample data structure for tasks with unlimited nesting levels
let tasks = [
    {
        id: 1,
        title: "Shopping",
        completed: false,
        expanded: false,
        weightedMode: false,
        weight: 0,
        subtasks: [
            { 
                id: 11, 
                title: "Buy groceries", 
                completed: false, 
                expanded: false,
                weightedMode: false,
                weight: 0,
                subtasks: [
                    { id: 111, title: "Buy potatoes", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
                    { id: 112, title: "Buy meat", completed: true, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
                    { 
                        id: 113, 
                        title: "Buy vegetables", 
                        completed: false, 
                        expanded: false,
                        weightedMode: false,
                        weight: 0,
                        subtasks: [
                            { id: 1131, title: "Carrots", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
                            { id: 1132, title: "Broccoli", completed: true, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
                            { id: 1133, title: "Spinach", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] }
                        ]
                    }
                ]
            },
            { id: 12, title: "Buy dairy products", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] }
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
            { id: 21, title: "Paint living room", completed: true, expanded: false, weightedMode: false, weight: 120, subtasks: [] },
            { id: 22, title: "Install new flooring", completed: false, expanded: false, weightedMode: false, weight: 300, subtasks: [] },
            { id: 23, title: "Replace light fixtures", completed: true, expanded: false, weightedMode: false, weight: 45, subtasks: [] },
            { id: 24, title: "Organize storage", completed: false, expanded: false, weightedMode: false, weight: 90, subtasks: [] }
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
            { 
                id: 31, 
                title: "Planning phase", 
                completed: false, 
                expanded: false,
                weightedMode: false,
                weight: 0,
                subtasks: [
                    { id: 311, title: "Research requirements", completed: true, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
                    { id: 312, title: "Create wireframes", completed: true, expanded: false, weightedMode: false, weight: 0, subtasks: [] }
                ]
            },
            { 
                id: 32, 
                title: "Development phase", 
                completed: false, 
                expanded: false,
                weightedMode: false,
                weight: 0,
                subtasks: [
                    { id: 321, title: "Develop prototype", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
                    { id: 322, title: "Test functionality", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
                    { id: 323, title: "Deploy to production", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] }
                ]
            }
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
            { id: 41, title: "Read Book 1", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 42, title: "Read Book 2", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 43, title: "Read Book 3", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 44, title: "Read Book 4", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 45, title: "Read Book 5", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 46, title: "Read Book 6", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 47, title: "Read Book 7", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 48, title: "Read Book 8", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 49, title: "Read Book 9", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 410, title: "Read Book 10", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 411, title: "Read Book 11", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 412, title: "Read Book 12", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 413, title: "Read Book 13", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 414, title: "Read Book 14", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 415, title: "Read Book 15", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 416, title: "Read Book 16", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 417, title: "Read Book 17", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 418, title: "Read Book 18", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 419, title: "Read Book 19", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] },
            { id: 420, title: "Read Book 20", completed: false, expanded: false, weightedMode: false, weight: 0, subtasks: [] }
        ]
    }
];

function calculateProgress(task) {
    if (!task.subtasks || task.subtasks.length === 0) {
        return task.completed ? 100 : 0;
    }
    
    if (task.weightedMode) {
        // Calculate progress based on time weights (recursive)
        const totalWeight = calculateTotalWeight(task.subtasks);
        if (totalWeight === 0) {
            // Fallback to count-based if no weights assigned
            return calculateCountBasedProgress(task.subtasks);
        }
        
        const completedWeight = calculateCompletedWeight(task.subtasks);
        return Math.round((completedWeight / totalWeight) * 100);
    } else {
        // Calculate progress based on task count (recursive)
        return calculateCountBasedProgress(task.subtasks);
    }
}

function calculateTotalWeight(subtasks) {
    return subtasks.reduce((sum, subtask) => {
        const subtaskWeight = subtask.weight || 0;
        const childrenWeight = subtask.subtasks && subtask.subtasks.length > 0 
            ? calculateTotalWeight(subtask.subtasks) 
            : 0;
        return sum + subtaskWeight + childrenWeight;
    }, 0);
}

function calculateCompletedWeight(subtasks) {
    return subtasks.reduce((sum, subtask) => {
        let weight = 0;
        
        if (subtask.subtasks && subtask.subtasks.length > 0) {
            // If has children, calculate based on children completion
            const childProgress = calculateProgress(subtask);
            const totalChildWeight = calculateTotalWeight(subtask.subtasks);
            weight = (childProgress / 100) * (totalChildWeight + (subtask.weight || 0));
        } else {
            // Leaf node - use direct completion status
            weight = subtask.completed ? (subtask.weight || 0) : 0;
        }
        
        return sum + weight;
    }, 0);
}

function calculateCountBasedProgress(subtasks) {
    const totalTasks = countAllTasks(subtasks);
    const completedTasks = countCompletedTasks(subtasks);
    return totalTasks === 0 ? 100 : Math.round((completedTasks / totalTasks) * 100);
}

function countAllTasks(subtasks) {
    return subtasks.reduce((count, subtask) => {
        const childCount = subtask.subtasks && subtask.subtasks.length > 0 
            ? countAllTasks(subtask.subtasks) 
            : 0;
        return count + 1 + childCount;
    }, 0);
}

function countCompletedTasks(subtasks) {
    return subtasks.reduce((count, subtask) => {
        const isCompleted = subtask.subtasks && subtask.subtasks.length > 0
            ? calculateProgress(subtask) === 100
            : subtask.completed;
        
        const childCount = subtask.subtasks && subtask.subtasks.length > 0 
            ? countCompletedTasks(subtask.subtasks) 
            : 0;
            
        return count + (isCompleted ? 1 : 0) + childCount;
    }, 0);
}

function updateTaskCompletion(task) {
    if (task.subtasks && task.subtasks.length > 0) {
        const progress = calculateProgress(task);
        task.completed = progress === 100;
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    
    // Store scroll position to restore after render
    const scrollTop = taskList.scrollTop;
    
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        renderTaskRecursive(task, taskList, 0);
    });
    
    // Restore scroll position
    taskList.scrollTop = scrollTop;
}

function renderTaskRecursive(task, parentElement, level) {
    updateTaskCompletion(task);
    const progress = calculateProgress(task);
    const progressGradient = getProgressGradient(progress);
    
    // Check for celebration
    checkAndCelebrate(task);
    
    const taskElement = document.createElement('div');
    
    if (level === 0) {
        // Main task styling - full featured with progress bar
        const totalTime = task.weightedMode && task.subtasks && task.subtasks.length > 0 
            ? calculateTotalWeight(task.subtasks) 
            : 0;
        const completedTime = task.weightedMode && task.subtasks && task.subtasks.length > 0 
            ? calculateCompletedWeight(task.subtasks) 
            : 0;
        const timeInfo = task.weightedMode && totalTime > 0 
            ? `<div class="time-info">${Math.round(completedTime)}/${totalTime} min</div>` 
            : '';
        
        taskElement.className = 'task-item';
        taskElement.innerHTML = `
            <div class="task-header">
                <span class="task-toggle ${task.subtasks && task.subtasks.length > 0 ? (task.expanded ? 'expanded' : '') : 'hidden'}" 
                      id="toggle-${task.id}" onclick="toggleTaskRecursive('${task.id}')">▶</span>
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                       onchange="toggleTaskCompletionRecursive('${task.id}')" onclick="event.stopPropagation()">
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
                    <!-- Child tasks will be rendered here -->
                </div>
            ` : ''}
        `;
    } else {
        // Subtask styling - simple, no progress bar
        taskElement.className = 'subtask-item';
        taskElement.style.paddingLeft = `${30 + (level - 1) * 20}px`;
        taskElement.innerHTML = `
            ${task.subtasks && task.subtasks.length > 0 ? `
                <span class="subtask-toggle ${task.expanded ? 'expanded' : ''}" onclick="toggleTaskRecursive('${task.id}')" id="toggle-${task.id}">▶</span>
            ` : '<span class="subtask-spacer"></span>'}
            <input type="checkbox" class="subtask-checkbox" ${task.completed ? 'checked' : ''}
                   onchange="toggleTaskCompletionRecursive('${task.id}')">
            <span class="subtask-title ${task.completed ? 'completed' : ''}">${task.title}</span>
            ${task.weightedMode && task.weight > 0 ? `<span class="subtask-weight">${task.weight} min</span>` : ''}
        `;
    }
    
    parentElement.appendChild(taskElement);
    
    // Render child tasks if expanded
    if (task.expanded && task.subtasks && task.subtasks.length > 0) {
        const subtasksContainer = level === 0 
            ? document.getElementById(`subtasks-${task.id}`)
            : parentElement;
            
        task.subtasks.forEach(subtask => {
            renderTaskRecursive(subtask, subtasksContainer, level + 1);
        });
    }
}

function findTaskRecursive(taskId, taskList = tasks) {
    for (let task of taskList) {
        if (task.id.toString() === taskId.toString()) {
            return task;
        }
        if (task.subtasks && task.subtasks.length > 0) {
            const found = findTaskRecursive(taskId, task.subtasks);
            if (found) return found;
        }
    }
    return null;
}

function toggleTaskRecursive(taskId) {
    const task = findTaskRecursive(taskId);
    if (task) {
        task.expanded = !task.expanded;
        
        const toggle = document.getElementById(`toggle-${taskId}`);
        const subtasksContainer = document.getElementById(`subtasks-${taskId}`);
        
        if (toggle && subtasksContainer) {
            // Handle main task (level 0) toggle - this works fine
            if (task.expanded) {
                toggle.classList.add('expanded');
                subtasksContainer.classList.add('expanded');
                
                // Render children into the existing container
                subtasksContainer.innerHTML = '';
                task.subtasks.forEach(subtask => {
                    renderTaskRecursive(subtask, subtasksContainer, 1);
                });
            } else {
                toggle.classList.remove('expanded');
                subtasksContainer.classList.remove('expanded');
                subtasksContainer.innerHTML = '';
            }
        } else if (toggle) {
            // For nested subtasks, use targeted DOM manipulation
            if (task.expanded) {
                toggle.classList.add('expanded');
                
                // Insert children right after the current element
                const currentElement = toggle.closest('.subtask-item');
                const parentContainer = currentElement.parentElement;
                
                // Calculate the correct indentation level
                const currentPadding = parseInt(currentElement.style.paddingLeft) || 30;
                const currentLevel = Math.max(1, Math.floor((currentPadding - 30) / 20) + 1);
                
                // Insert each child after the current element
                let insertAfter = currentElement;
                task.subtasks.forEach(subtask => {
                    const childElement = document.createElement('div');
                    childElement.className = 'subtask-item';
                    childElement.style.paddingLeft = `${30 + currentLevel * 20}px`;
                    childElement.innerHTML = `
                        ${subtask.subtasks && subtask.subtasks.length > 0 ? `
                            <span class="subtask-toggle ${subtask.expanded ? 'expanded' : ''}" onclick="toggleTaskRecursive('${subtask.id}')" id="toggle-${subtask.id}">▶</span>
                        ` : '<span class="subtask-spacer"></span>'}
                        <input type="checkbox" class="subtask-checkbox" ${subtask.completed ? 'checked' : ''}
                               onchange="toggleTaskCompletionRecursive('${subtask.id}')">
                        <span class="subtask-title ${subtask.completed ? 'completed' : ''}">${subtask.title}</span>
                        ${subtask.weightedMode && subtask.weight > 0 ? `<span class="subtask-weight">${subtask.weight} min</span>` : ''}
                    `;
                    
                    // Insert after the previous element
                    parentContainer.insertBefore(childElement, insertAfter.nextSibling);
                    insertAfter = childElement;
                    
                    // If this child is expanded, render its children too
                    if (subtask.expanded && subtask.subtasks && subtask.subtasks.length > 0) {
                        insertAfter = insertNestedChildren(subtask, parentContainer, insertAfter, currentLevel + 1);
                    }
                });
            } else {
                toggle.classList.remove('expanded');
                
                // Remove all direct children of this task
                const currentElement = toggle.closest('.subtask-item');
                const parentContainer = currentElement.parentElement;
                const currentPadding = parseInt(currentElement.style.paddingLeft) || 30;
                
                // Remove elements that are children of this task
                let nextElement = currentElement.nextSibling;
                while (nextElement && 
                       nextElement.classList && 
                       nextElement.classList.contains('subtask-item')) {
                    const nextPadding = parseInt(nextElement.style.paddingLeft) || 30;
                    if (nextPadding > currentPadding) {
                        const elementToRemove = nextElement;
                        nextElement = nextElement.nextSibling;
                        parentContainer.removeChild(elementToRemove);
                    } else {
                        break;
                    }
                }
            }
        }
    }
}



function toggleTaskCompletionRecursive(taskId) {
    const task = findTaskRecursive(taskId);
    if (task) {
        task.completed = !task.completed;
        
        // If task is manually completed, mark all children as completed
        if (task.completed && task.subtasks && task.subtasks.length > 0) {
            markAllChildrenComplete(task, true);
        }
        // If task is manually uncompleted, mark all children as uncompleted
        else if (!task.completed && task.subtasks && task.subtasks.length > 0) {
            markAllChildrenComplete(task, false);
        }
        
        // Update only the affected elements instead of full re-render
        updateTaskDisplayRecursive(task);
        updateParentTasksDisplay(taskId);
    }
}

function insertNestedChildren(task, parentContainer, insertAfter, level) {
    task.subtasks.forEach(subtask => {
        const childElement = document.createElement('div');
        childElement.className = 'subtask-item';
        childElement.style.paddingLeft = `${30 + (level - 1) * 20}px`;
        childElement.innerHTML = `
            ${subtask.subtasks && subtask.subtasks.length > 0 ? `
                <span class="subtask-toggle ${subtask.expanded ? 'expanded' : ''}" onclick="toggleTaskRecursive('${subtask.id}')" id="toggle-${subtask.id}">▶</span>
            ` : '<span class="subtask-spacer"></span>'}
            <input type="checkbox" class="subtask-checkbox" ${subtask.completed ? 'checked' : ''}
                   onchange="toggleTaskCompletionRecursive('${subtask.id}')">
            <span class="subtask-title ${subtask.completed ? 'completed' : ''}">${subtask.title}</span>
            ${subtask.weightedMode && subtask.weight > 0 ? `<span class="subtask-weight">${subtask.weight} min</span>` : ''}
        `;
        
        // Insert after the previous element
        parentContainer.insertBefore(childElement, insertAfter.nextSibling);
        insertAfter = childElement;
        
        // Recursively insert children if they're expanded
        if (subtask.expanded && subtask.subtasks && subtask.subtasks.length > 0) {
            insertAfter = insertNestedChildren(subtask, parentContainer, insertAfter, level + 1);
        }
    });
    return insertAfter;
}

function updateTaskDisplayRecursive(task) {
    // Update the current task's visual state
    const checkbox = document.querySelector(`input[onchange*="${task.id}"]`);
    const titleElement = document.querySelector(`#toggle-${task.id}`);
    
    if (checkbox) {
        checkbox.checked = task.completed;
    }
    
    if (titleElement) {
        const titleSpan = titleElement.parentElement.querySelector('.task-title, .subtask-title');
        if (titleSpan) {
            if (task.completed) {
                titleSpan.classList.add('completed');
            } else {
                titleSpan.classList.remove('completed');
            }
        }
        
        // Update progress bar for main tasks (level 0)
        const progressFill = titleElement.parentElement.querySelector('.progress-fill');
        const progressText = titleElement.parentElement.querySelector('.progress-text');
        
        if (progressFill && progressText) {
            const progress = calculateProgress(task);
            const progressGradient = getProgressGradient(progress);
            progressFill.style.width = `${progress}%`;
            progressFill.style.background = progressGradient;
            progressText.textContent = `${progress}%`;
            
            // Check for celebration
            checkAndCelebrate(task);
        }
    }
    
    // Update all children if they exist
    if (task.subtasks && task.subtasks.length > 0) {
        task.subtasks.forEach(subtask => {
            updateTaskDisplayRecursive(subtask);
        });
    }
}

function updateParentTasksDisplay(taskId) {
    // Find and update all parent tasks to reflect new progress
    const updateParentTask = (parentTask) => {
        const parentToggle = document.querySelector(`#toggle-${parentTask.id}`);
        if (parentToggle) {
            const progressFill = parentToggle.parentElement.querySelector('.progress-fill');
            const progressText = parentToggle.parentElement.querySelector('.progress-text');
            
            if (progressFill && progressText) {
                const progress = calculateProgress(parentTask);
                const progressGradient = getProgressGradient(progress);
                progressFill.style.width = `${progress}%`;
                progressFill.style.background = progressGradient;
                progressText.textContent = `${progress}%`;
                
                // Check for celebration
                checkAndCelebrate(parentTask);
            }
        }
    };
    
    // Update all main tasks since we don't have explicit parent references
    tasks.forEach(task => {
        updateParentTask(task);
    });
}

function markAllChildrenComplete(task, completed) {
    if (task.subtasks && task.subtasks.length > 0) {
        task.subtasks.forEach(subtask => {
            subtask.completed = completed;
            markAllChildrenComplete(subtask, completed);
        });
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
                    expanded: false,
                    weightedMode: false,
                    weight: subtaskWeight,
                    subtasks: []
                });
            }
        });
    }
    
    tasks.push(newTask);
    renderTasks();
    closeAddTaskModal();
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
    const toggleElement = document.querySelector(`#toggle-${taskId}`);
    if (!toggleElement) {
        // Element not in DOM yet, skip celebration
        return;
    }
    
    const taskElement = toggleElement.closest('.task-item');
    const progressFill = toggleElement.parentElement.querySelector('.progress-fill');
    const progressContainer = toggleElement.parentElement.querySelector('.progress-container');
    
    if (!taskElement || !progressFill || !progressContainer) {
        // Required elements not found, skip celebration
        return;
    }
    
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