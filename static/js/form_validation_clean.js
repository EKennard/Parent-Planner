/**
 * Clean form validation functions for ParentPlanner
 * Native HTML5 date/time pickers only - no Flatpickr
 */

/**
 * Validates event start and end times (for separated fields)
 */
function validateEventTimes() {
    const eventStartTime = document.getElementById('id_event_start_time');
    const eventEndTime = document.getElementById('id_event_end_time');
    
    if (!eventStartTime || !eventEndTime) return;
    
    const startTime = eventStartTime.value;
    const endTime = eventEndTime.value;
    
    if (startTime && endTime) {
        if (startTime >= endTime) {
            eventEndTime.setCustomValidity('End time must be after start time');
            eventEndTime.style.borderColor = '#ef4444';
        } else {
            eventEndTime.setCustomValidity('');
            eventEndTime.style.borderColor = '#4F46E5';
        }
    } else {
        eventEndTime.setCustomValidity('');
        eventEndTime.style.borderColor = '#4F46E5';
    }
}

/**
 * Auto-suggest end time when start time is selected
 */
function autoSuggestEndTime() {
    const eventStartTime = document.getElementById('id_event_start_time');
    const eventEndTime = document.getElementById('id_event_end_time');
    
    if (!eventStartTime || !eventEndTime) return;
    
    const startTime = eventStartTime.value;
    if (startTime && !eventEndTime.value) {
        // Auto-suggest 1 hour later
        const [hours, minutes] = startTime.split(':');
        const startDate = new Date();
        startDate.setHours(parseInt(hours), parseInt(minutes));
        startDate.setHours(startDate.getHours() + 1);
        
        const suggestedEndTime = startDate.toTimeString().slice(0, 5);
        eventEndTime.value = suggestedEndTime;
        
        // Add visual indication
        eventEndTime.style.backgroundColor = '#f0f9ff';
        setTimeout(() => {
            eventEndTime.style.backgroundColor = '#f8fafc';
        }, 1000);
    }
}

/**
 * Validates task due date is not in the past
 */
function validateTaskDate() {
    const taskDueDateInput = document.getElementById('id_task_due_date');
    
    if (!taskDueDateInput) return;
    
    const selectedDate = taskDueDateInput.value;
    if (selectedDate) {
        const today = new Date().toISOString().split('T')[0];
        if (selectedDate < today) {
            taskDueDateInput.setCustomValidity('Due date cannot be in the past');
            taskDueDateInput.style.borderColor = '#ef4444';
        } else {
            taskDueDateInput.setCustomValidity('');
            taskDueDateInput.style.borderColor = '#4F46E5';
        }
    }
}

/**
 * Initialize form validation for the current page
 */
function initializeFormValidation() {
    console.log('Initializing clean form validation (no Flatpickr)');
    
    // Event time validation
    const eventStartTime = document.getElementById('id_event_start_time');
    const eventEndTime = document.getElementById('id_event_end_time');
    
    if (eventStartTime) {
        eventStartTime.addEventListener('change', () => {
            autoSuggestEndTime();
            validateEventTimes();
        });
    }
    
    if (eventEndTime) {
        eventEndTime.addEventListener('change', validateEventTimes);
    }
    
    // Task date validation
    const taskDueDateInput = document.getElementById('id_task_due_date');
    if (taskDueDateInput) {
        taskDueDateInput.addEventListener('change', validateTaskDate);
    }
    
    // Entry type toggle functionality
    const entryTypeField = document.getElementById('id_entry_type');
    if (entryTypeField) {
        entryTypeField.addEventListener('change', toggleEntryFields);
        // Initialize on page load
        toggleEntryFields();
    }
}

/**
 * Toggle visibility of entry type specific fields
 */
function toggleEntryFields() {
    const entryTypeField = document.getElementById('id_entry_type');
    const taskFields = document.getElementById('taskFields');
    const eventFields = document.getElementById('eventFields');
    
    if (!entryTypeField) return;
    
    const entryType = entryTypeField.value;
    console.log('Entry type changed to:', entryType);
    
    if (taskFields && eventFields) {
        if (entryType === 'task') {
            taskFields.style.display = 'block';
            eventFields.style.display = 'none';
        } else if (entryType === 'event') {
            eventFields.style.display = 'block';
            taskFields.style.display = 'none';
        } else {
            taskFields.style.display = 'none';
            eventFields.style.display = 'none';
        }
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeFormValidation);
