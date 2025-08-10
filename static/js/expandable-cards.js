/**
 * Expandable Cards Functionality
 * Handles expanding/collapsing entry cards and showing full details with edit/delete actions
 */

console.log('Expandable cards script loading...');

// Track expanded cards
let expandedCards = new Set();

/**
 * Toggle card expansion
 */
function toggleCardExpansion(cardElement) {
    const cardId = cardElement.dataset.cardId;
    const cardType = cardElement.dataset.cardType;
    
    if (expandedCards.has(cardId)) {
        collapseCard(cardElement, cardId);
    } else {
        expandCard(cardElement, cardId, cardType);
    }
}

/**
 * Expand a card to show full details
 */
function expandCard(cardElement, cardId, cardType) {
    // Add to expanded set
    expandedCards.add(cardId);
    
    // Add expanded class
    cardElement.classList.add('expanded');
    
    // Find the content container
    const contentContainer = cardElement.querySelector('.card-content');
    if (!contentContainer) return;
    
    // Show all hidden content
    const truncatedElements = cardElement.querySelectorAll('.line-clamp-2, .line-clamp-3');
    truncatedElements.forEach(el => {
        el.classList.remove('line-clamp-2', 'line-clamp-3');
        el.classList.add('expanded-content');
    });
    
    // Show expanded details
    const expandedDetails = cardElement.querySelector('.expanded-details');
    if (expandedDetails) {
        expandedDetails.classList.remove('hidden');
    }
    
    // Add action buttons if not already present
    if (!cardElement.querySelector('.card-actions')) {
        const actionsDiv = createActionButtons(cardId, cardType);
        contentContainer.appendChild(actionsDiv);
    }
    
    // Add visual indicator that card is expanded
    cardElement.style.transform = 'scale(1.02)';
    cardElement.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    cardElement.style.zIndex = '10';
}

/**
 * Collapse a card back to summary view
 */
function collapseCard(cardElement, cardId) {
    // Remove from expanded set
    expandedCards.delete(cardId);
    
    // Remove expanded class
    cardElement.classList.remove('expanded');
    
    // Restore truncated content
    const expandedContent = cardElement.querySelectorAll('.expanded-content');
    expandedContent.forEach(el => {
        el.classList.remove('expanded-content');
        // Restore appropriate line clamp based on content type
        if (el.textContent.length > 100) {
            el.classList.add('line-clamp-3');
        } else {
            el.classList.add('line-clamp-2');
        }
    });
    
    // Hide expanded details
    const expandedDetails = cardElement.querySelector('.expanded-details');
    if (expandedDetails) {
        expandedDetails.classList.add('hidden');
    }
    
    // Remove action buttons
    const actionsDiv = cardElement.querySelector('.card-actions');
    if (actionsDiv) {
        actionsDiv.remove();
    }
    
    // Reset visual state
    cardElement.style.transform = '';
    cardElement.style.boxShadow = '';
    cardElement.style.zIndex = '';
}

/**
 * Create action buttons for edit and delete
 */
function createActionButtons(cardId, cardType) {
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'card-actions flex items-center justify-between mt-3 pt-3 border-t border-gray-200';
    
    // For tasks, add completion toggle button first
    if (cardType === 'task') {
        const taskCard = document.querySelector(`[data-card-id="${cardId}"][data-card-type="task"]`);
        const isCompleted = taskCard?.dataset.completed === 'true';
        
        // Create container for completion toggle with label
        const completionContainer = document.createElement('div');
        completionContainer.className = 'flex items-center gap-2';
        
        const completionLabel = document.createElement('span');
        completionLabel.className = 'text-xs text-gray-600 font-medium';
        completionLabel.textContent = 'Completed?';
        
        const completionBtn = document.createElement('button');
        completionBtn.className = 'task-completion-toggle flex items-center justify-center w-8 h-8 rounded border transition-colors duration-200';
        completionBtn.dataset.taskId = cardId;
        completionBtn.dataset.completed = isCompleted.toString();
        
        if (isCompleted) {
            completionBtn.className += ' bg-green-50 text-green-700 border-green-200 hover:bg-green-100';
            completionBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
            completionBtn.title = 'Mark as Incomplete';
        } else {
            completionBtn.className += ' bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100';
            completionBtn.innerHTML = '<i class="far fa-circle"></i>';
            completionBtn.title = 'Mark as Complete';
        }
        
        completionBtn.onclick = (e) => {
            e.stopPropagation();
            toggleTaskCompletion(cardId, !isCompleted, completionBtn);
        };
        
        completionContainer.appendChild(completionLabel);
        completionContainer.appendChild(completionBtn);
        actionsDiv.appendChild(completionContainer);
        
        // Create container for edit/delete buttons
        const editDeleteContainer = document.createElement('div');
        editDeleteContainer.className = 'flex items-center gap-2';
        
        // Edit button (icon only)
        const editBtn = document.createElement('button');
        editBtn.className = 'flex items-center justify-center w-8 h-8 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded transition-colors duration-200';
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.title = 'Edit';
        editBtn.onclick = (e) => {
            e.stopPropagation();
            handleEdit(cardId, cardType);
        };
        
        // Delete button (icon only)
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'flex items-center justify-center w-8 h-8 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded transition-colors duration-200';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.title = 'Delete';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            handleDelete(cardId, cardType);
        };
        
        editDeleteContainer.appendChild(editBtn);
        editDeleteContainer.appendChild(deleteBtn);
        actionsDiv.appendChild(editDeleteContainer);
    } else {
        // For non-task items, create a spacer and put edit/delete on the right
        const spacer = document.createElement('div');
        
        const editDeleteContainer = document.createElement('div');
        editDeleteContainer.className = 'flex items-center gap-2';
        
        // Edit button (icon only)
        const editBtn = document.createElement('button');
        editBtn.className = 'flex items-center justify-center w-8 h-8 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded transition-colors duration-200';
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.title = 'Edit';
        editBtn.onclick = (e) => {
            e.stopPropagation();
            handleEdit(cardId, cardType);
        };
        
        // Delete button (icon only)
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'flex items-center justify-center w-8 h-8 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded transition-colors duration-200';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.title = 'Delete';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            handleDelete(cardId, cardType);
        };
        
        editDeleteContainer.appendChild(editBtn);
        editDeleteContainer.appendChild(deleteBtn);
        
        actionsDiv.appendChild(spacer);
        actionsDiv.appendChild(editDeleteContainer);
    }
    
    return actionsDiv;
}

/**
 * Handle edit action
 */
function handleEdit(cardId, cardType) {
    console.log(`Editing ${cardType} with ID: ${cardId}`);
    
    // Redirect to edit page or open edit modal based on your preference
    switch(cardType) {
        case 'event':
            window.location.href = `/planner/events/edit/${cardId}/`;
            break;
        case 'task':
            window.location.href = `/planner/tasks/edit/${cardId}/`;
            break;
        case 'note':
            window.location.href = `/planner/notes/edit/${cardId}/`;
            break;
        default:
            console.error('Unknown card type:', cardType);
    }
}

/**
 * Handle delete action with confirmation
 */
function handleDelete(cardId, cardType) {
    const confirmMessage = `Are you sure you want to delete this ${cardType}? This action cannot be undone.`;
    
    if (confirm(confirmMessage)) {
        console.log(`Deleting ${cardType} with ID: ${cardId}`);
        
        // Send delete request
        fetch(`/planner/${cardType}s/delete/${cardId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCsrfToken(),
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                // Remove card from DOM with animation
                const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
                if (cardElement) {
                    cardElement.style.transition = 'all 0.3s ease';
                    cardElement.style.transform = 'scale(0.8)';
                    cardElement.style.opacity = '0';
                    setTimeout(() => {
                        cardElement.remove();
                        // Show success message
                        showNotification(`${cardType.charAt(0).toUpperCase() + cardType.slice(1)} deleted successfully`, 'success');
                    }, 300);
                }
            } else {
                throw new Error('Delete failed');
            }
        })
        .catch(error => {
            console.error('Error deleting:', error);
            showNotification(`Failed to delete ${cardType}. Please try again.`, 'error');
        });
    }
}

/**
 * Get CSRF token for form submissions
 */
function getCsrfToken() {
    const token = document.querySelector('[name=csrfmiddlewaretoken]');
    return token ? token.value : '';
}

/**
 * Show notification to user
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-4 py-2 rounded shadow-lg z-50 transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Initialize expandable cards when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing expandable cards...');
    
    // Add click handlers to all entry cards
    const cards = document.querySelectorAll('[data-card-id]');
    cards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            // Don't expand if clicking on action buttons
            if (e.target.closest('.card-actions')) return;
            
            toggleCardExpansion(this);
        });
    });
    
    // Initialize task completion states for any tasks already marked as completed
    initializeTaskCompletionStates();
    
    console.log(`Initialized ${cards.length} expandable cards`);
});

/**
 * Initialize task completion states on page load
 */
function initializeTaskCompletionStates() {
    const taskCards = document.querySelectorAll('[data-card-type="task"]');
    taskCards.forEach(taskCard => {
        const isCompleted = taskCard.dataset.completed === 'true';
        if (isCompleted) {
            // Ensure completed tasks have proper styling
            taskCard.classList.add('task-completed');
            taskCard.classList.remove('bg-white');
            taskCard.classList.add('bg-gray-50');
            
            // Update completion toggle button if present
            const toggleButton = taskCard.querySelector('.task-completion-toggle');
            if (toggleButton) {
                const icon = toggleButton.querySelector('i');
                icon.className = 'fas fa-check-circle';
                toggleButton.className = toggleButton.className.replace(/bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100/, 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100');
                toggleButton.title = 'Mark as Incomplete';
                toggleButton.dataset.completed = 'true';
            }
        }
    });
    
    // Initial reordering to ensure proper task order
    setTimeout(() => {
        reorderTasksByCompletion();
    }, 100);
}

// Handle escape key to collapse all cards
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Collapse all expanded cards
        const expandedCardElements = document.querySelectorAll('.expanded');
        expandedCardElements.forEach(card => {
            const cardId = card.dataset.cardId;
            collapseCard(card, cardId);
        });
    }
});

/**
 * Debug function to test task completion styling
 */
function debugTaskCompletion() {
    console.log('=== DEBUG: Testing task completion styling ===');
    const taskCards = document.querySelectorAll('[data-card-type="task"]');
    console.log(`Found ${taskCards.length} task cards`);
    
    taskCards.forEach((card, index) => {
        console.log(`Task ${index + 1}:`, {
            id: card.dataset.cardId,
            completed: card.dataset.completed,
            classes: card.className,
            styles: card.style.cssText
        });
    });
    
    // Test applying completed styling to the first task
    if (taskCards.length > 0) {
        const firstTask = taskCards[0];
        console.log('Testing styling on first task...');
        firstTask.classList.add('task-completed');
        firstTask.style.backgroundColor = '#f9fafb';
        firstTask.style.opacity = '0.7';
        console.log('Applied test styling to first task');
    }
}

/**
 * Task Completion Toggle Functionality
 */

// Handle task completion toggle
document.addEventListener('click', function(e) {
    if (e.target.closest('.task-completion-toggle')) {
        e.preventDefault();
        e.stopPropagation(); // Prevent card expansion when clicking toggle
        
        const toggleButton = e.target.closest('.task-completion-toggle');
        const taskId = toggleButton.dataset.taskId;
        const isCompleted = toggleButton.dataset.completed === 'true';
        
        toggleTaskCompletion(taskId, !isCompleted, toggleButton);
    }
});

/**
 * Toggle task completion status
 */
function toggleTaskCompletion(taskId, newCompletedStatus, toggleButton) {
    const taskCard = document.querySelector(`[data-card-id="${taskId}"][data-card-type="task"]`);
    
    // Show loading state
    toggleButton.disabled = true;
    toggleButton.style.opacity = '0.5';
    
    // Get CSRF token
    const csrfTokenElement = document.querySelector('[name=csrfmiddlewaretoken]');
    if (!csrfTokenElement) {
        console.error('CSRF token not found');
        showNotification('CSRF token not found', 'error');
        toggleButton.disabled = false;
        toggleButton.style.opacity = '1';
        return;
    }
    const csrfToken = csrfTokenElement.value;
    
    console.log(`Toggling task ${taskId} completion to ${newCompletedStatus}`);
    
    // Send request to update task
    fetch(`/tasks/${taskId}/toggle-completion/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
            is_completed: newCompletedStatus
        })
    })
    .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
        if (data.success) {
            // Update button state
            updateTaskCompletionUI(toggleButton, taskCard, newCompletedStatus);
            
            // Reorder tasks if needed
            reorderTasksByCompletion();
            
            // Show success message
            showNotification(
                newCompletedStatus ? 'Task marked as completed!' : 'Task marked as pending!',
                'success'
            );
        } else {
            console.error('Server responded with error:', data.error);
            showNotification('Failed to update task status: ' + (data.error || 'Unknown error'), 'error');
        }
    })
    .catch(error => {
        console.error('Error updating task:', error);
        showNotification('Failed to update task status: ' + error.message, 'error');
    })
    .finally(() => {
        // Remove loading state
        toggleButton.disabled = false;
        toggleButton.style.opacity = '1';
    });
}

/**
 * Update task completion UI
 */
function updateTaskCompletionUI(toggleButton, taskCard, isCompleted) {
    console.log(`Updating task completion UI: ${isCompleted ? 'completed' : 'incomplete'}`);
    console.log('Task card element:', taskCard);
    
    // Update button icon and styling
    const icon = toggleButton.querySelector('i');
    
    if (isCompleted) {
        icon.className = 'fas fa-check-circle';
        toggleButton.className = toggleButton.className.replace(/bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100/, 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100');
        toggleButton.title = 'Mark as Incomplete';
        
        // Update card styling for completed state
        taskCard.classList.add('task-completed');
        taskCard.classList.remove('bg-white');
        taskCard.classList.add('bg-gray-50');
        
        // Force apply styles immediately
        taskCard.style.backgroundColor = '#f9fafb';
        taskCard.style.opacity = '0.7';
        taskCard.style.borderLeftColor = '#d1d5db';
        
        console.log('Applied completed styling to task card');
        
        // Add subtle animation for completion
        taskCard.style.transform = 'scale(0.98)';
        setTimeout(() => {
            taskCard.style.transform = '';
        }, 300);
        
    } else {
        icon.className = 'far fa-circle';
        toggleButton.className = toggleButton.className.replace(/bg-green-50 text-green-700 border-green-200 hover:bg-green-100/, 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100');
        toggleButton.title = 'Mark as Complete';
        
        // Update card styling for incomplete state
        taskCard.classList.remove('task-completed');
        taskCard.classList.remove('bg-gray-50');
        taskCard.classList.add('bg-white');
        
        // Remove inline styles to revert to normal
        taskCard.style.backgroundColor = '';
        taskCard.style.opacity = '';
        taskCard.style.borderLeftColor = '';
        
        console.log('Removed completed styling from task card');
        
        // Add subtle animation for uncompleting
        taskCard.style.transform = 'scale(1.02)';
        setTimeout(() => {
            taskCard.style.transform = '';
        }, 300);
    }
    
    // Update data attributes
    toggleButton.dataset.completed = isCompleted.toString();
    taskCard.dataset.completed = isCompleted.toString();
}

/**
 * Reorder tasks to show completed ones at bottom
 */
function reorderTasksByCompletion() {
    console.log('Starting task reordering...');
    
    // Try multiple selectors to find the tasks container
    const tasksContainer = document.querySelector('#tasks-section') ||
                          document.querySelector('#tasks-section .space-y-3') || 
                          document.querySelector('.space-y-3:has([data-card-type="task"])') ||
                          document.querySelector('[data-card-type="task"]')?.parentElement;
    
    if (!tasksContainer) {
        console.warn('Tasks container not found for reordering');
        console.log('Available containers:', document.querySelectorAll('.space-y-3'));
        return;
    }
    
    console.log('Found tasks container:', tasksContainer);
    
    const taskCards = Array.from(tasksContainer.querySelectorAll('[data-card-type="task"]'));
    
    if (taskCards.length === 0) {
        console.warn('No task cards found for reordering');
        return;
    }
    
    console.log(`Reordering ${taskCards.length} tasks`);
    console.log('Task cards before sorting:', taskCards.map(card => ({
        id: card.dataset.cardId,
        completed: card.dataset.completed,
        title: card.querySelector('h4')?.textContent
    })));
    
    // Sort tasks: incomplete first (sorted by most recent), then completed last (sorted by most recent)
    taskCards.sort((a, b) => {
        const aCompleted = a.dataset.completed === 'true';
        const bCompleted = b.dataset.completed === 'true';
        
        // If completion status is different, sort incomplete first
        if (aCompleted !== bCompleted) {
            return aCompleted ? 1 : -1;
        }
        
        // If both have same completion status, preserve original DOM order
        // (which should reflect the database ordering by creation date)
        return 0;
    });
    
    console.log('Task cards after sorting:', taskCards.map(card => ({
        id: card.dataset.cardId,
        completed: card.dataset.completed,
        title: card.querySelector('h4')?.textContent
    })));
    
    // Re-append in new order with smooth animation
    taskCards.forEach((card, index) => {
        setTimeout(() => {
            tasksContainer.appendChild(card);
        }, index * 30); // Stagger the reordering for smooth effect
    });
    
    console.log('Task reordering completed');
    
    // Add visual feedback for the reordering
    setTimeout(() => {
        taskCards.forEach(card => {
            if (card.dataset.completed === 'true') {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 200);
            }
        });
    }, taskCards.length * 30);
}
