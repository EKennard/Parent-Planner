/**
 * Shared form validation functions for ParentPlanner
 * Used by both addEntry.html and editEntry.html
 */

/**
 * Updates end time constraints based on start time (Native HTML5)
 */
function updateEndTimeConstraint() {
    const startTimeField = document.getElementById('id_start_time');
    const endTimeField = document.getElementById('id_end_time');
    
    if (!startTimeField || !endTimeField) return;
    
    const startTime = startTimeField.value;
    if (startTime) {
        // Set minimum end time to start time
        endTimeField.min = startTime;
        
        // Smart default: If no end time set, auto-set to 1 hour after start
        if (!endTimeField.value) {
            // Parse start time and add 1 hour
            const [hours, minutes] = startTime.split(':');
            const startHour = parseInt(hours, 10);
            const startMinute = parseInt(minutes, 10);
            
            let endHour = startHour + 1;
            let endMinute = startMinute;
            
            // Handle hour overflow
            if (endHour >= 24) {
                endHour = 23;
                endMinute = 59;
            }
            
            const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
            endTimeField.value = endTime;
            
            // Add visual indication
            endTimeField.style.backgroundColor = '#f0f9ff';
            setTimeout(() => {
                endTimeField.style.backgroundColor = '';
            }, 1000);
        }
    } else {
        // Remove constraint if no start time
        endTimeField.removeAttribute('min');
    }
}

/**
 * Validates event start and end times (Native HTML5)
 */
function validateEventTimes() {
    const startTimeField = document.getElementById('id_start_time');
    const endTimeField = document.getElementById('id_end_time');
    
    if (!startTimeField || !endTimeField) return true;
    
    const startTime = startTimeField.value;
    const endTime = endTimeField.value;
    
    // Only validate if both times are set
    if (startTime && endTime) {
        // Compare time strings directly (HH:MM format)
        if (endTime <= startTime) {
            // Remove any existing error messages
            const existingError = endTimeField.parentNode.querySelector('.time-validation-error');
            if (existingError) existingError.remove();
            
            // Add error message
            const errorDiv = document.createElement('p');
            errorDiv.className = 'mt-1 text-sm text-red-600 font-medium time-validation-error';
            errorDiv.textContent = 'End time must be after start time';
            endTimeField.parentNode.appendChild(errorDiv);
            
            // Style the input as invalid
            endTimeField.style.borderColor = '#DC2626';
            return false;
        } else {
            // Remove error message if validation passes
            const existingError = endTimeField.parentNode.querySelector('.time-validation-error');
            if (existingError) existingError.remove();
            
            // Reset border color
            endTimeField.style.borderColor = '';
            return true;
        }
    }
    return true;
}

/**
 * Validates task due date (Native HTML5)
 */
function validateTaskDate() {
    const dueDateField = document.getElementById('id_due_date');
    
    if (!dueDateField) return true;
    
    const dueDate = dueDateField.value;
    
    if (dueDate) {
        // Parse HTML5 date format (YYYY-MM-DD)
        const dueDateObj = new Date(dueDate + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time for date comparison
        
        if (dueDateObj < today) {
            // Remove any existing error messages
            const existingError = dueDateField.parentNode.querySelector('.date-validation-error');
            if (existingError) existingError.remove();
            
            // Add warning message (not blocking, just informative)
            const warningDiv = document.createElement('p');
            warningDiv.className = 'mt-1 text-sm text-amber-600 font-medium date-validation-error';
            warningDiv.textContent = 'Due date is in the past';
            dueDateField.parentNode.appendChild(warningDiv);
            
            // Style the input as warning
            dueDateField.style.borderColor = '#F59E0B';
        } else {
            // Remove warning message
            const existingError = dueDateField.parentNode.querySelector('.date-validation-error');
            if (existingError) existingError.remove();
            
            // Reset border color
            dueDateField.style.borderColor = '';
        }
    }
    return true;
}

/**
 * Toggles entry type specific fields
 * FIXED: Event entries now only show event fields (not task fields)
 */
function toggleEntryFields() {
    const entryType = document.getElementById('id_entry_type').value;
    const taskFields = document.getElementById('taskFields');
    const eventFields = document.getElementById('eventFields');
    
    // Hide all conditional fields initially
    if (taskFields) taskFields.style.display = 'none';
    if (eventFields) eventFields.style.display = 'none';

    // Show relevant fields based on entry type - CORRECTED LOGIC
    if (entryType === 'task' && taskFields) {
        taskFields.style.display = 'block';
    } else if (entryType === 'event' && eventFields) {
        eventFields.style.display = 'block'; // Only show event fields for events
    }
}

/**
 * Initialize form validation
 */
function initializeFormValidation() {
    // Add event listener to entry type field
    const entryTypeField = document.getElementById('id_entry_type');
    if (entryTypeField) {
        entryTypeField.addEventListener('change', toggleEntryFields);
        toggleEntryFields(); // Initial call
    }
    
    // Add event listeners for time validation
    const startTimeField = document.getElementById('id_start_time');
    const endTimeField = document.getElementById('id_end_time');
    const dueDateField = document.getElementById('id_due_date');
    
    if (startTimeField) {
        startTimeField.addEventListener('change', function() {
            updateEndTimeConstraint();
            validateEventTimes();
        });
        startTimeField.addEventListener('blur', function() {
            updateEndTimeConstraint();
            validateEventTimes();
        });
    }
    
    if (endTimeField) {
        endTimeField.addEventListener('change', validateEventTimes);
        endTimeField.addEventListener('blur', validateEventTimes);
    }
    
    if (dueDateField) {
        dueDateField.addEventListener('change', validateTaskDate);
        dueDateField.addEventListener('blur', validateTaskDate);
    }
    
    // Form submission validation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const isEventTimeValid = validateEventTimes();
            
            if (!isEventTimeValid) {
                e.preventDefault();
                
                // Show a general error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'mb-4 p-4 border-2 bg-red-50 text-red-700 border-red-600';
                errorMessage.textContent = 'Please fix the validation errors before submitting.';
                
                // Insert at the top of the form
                const formContainer = form.parentNode;
                formContainer.insertBefore(errorMessage, form);
                
                // Remove the message after 5 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
                
                // Scroll to the error
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                return false;
            }
        });
    }
}

// Make functions available globally
window.updateEndTimeConstraint = updateEndTimeConstraint;
window.validateEventTimes = validateEventTimes;
window.validateTaskDate = validateTaskDate;
window.toggleEntryFields = toggleEntryFields;
window.initializeFormValidation = initializeFormValidation;
