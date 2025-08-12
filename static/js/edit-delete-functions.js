// Shared JavaScript functions for edit and delete operations across all pages

// Debug logging to help troubleshoot Heroku deployment
console.log('Edit-delete-functions.js loaded successfully');

// Add a global error handler to catch any JavaScript errors
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error, e.filename, e.lineno);
});

// Test function to verify JavaScript is working
function testJavaScript() {
    console.log('JavaScript test function called - JS is working!');
    alert('JavaScript is working!');
}

// Make sure DOM is ready before any modal operations
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Ready for modal operations');
});

// Modal functions for editing events specifically
function openEditEventModal(eventId, childId, category, title, content, date) {
    console.log('openEditEventModal called:', {eventId, childId, category, title, content, date});
    
    // Check if we're on the dashboard page with the modal
    const modal = document.getElementById('editEventModal');
    if (!modal) {
        console.log('Event modal not found, redirecting...');
        // If modal doesn't exist, redirect to dashboard
        window.location.href = `/dashboard/?edit=event&id=${eventId}`;
        return;
    }

    console.log('Event modal found, proceeding with edit...');

    // Fill the form fields with null checks
    const childField = document.getElementById('edit_event_child');
    const titleField = document.getElementById('edit_event_title');
    const contentField = document.getElementById('edit_event_content');
    const dateField = document.getElementById('edit_event_date');
    const categoryField = document.getElementById('edit_event_category');
    const form = document.getElementById('editEventForm');
    
    if (childField) childField.value = childId || '';
    if (titleField) titleField.value = title || '';
    if (contentField) contentField.value = content || '';
    if (dateField && date) dateField.value = date;
    if (categoryField) categoryField.value = category || 'none';

    // Set form action
    if (form) {
        form.action = `/save-entry/${eventId}/`;
    }

    // Show modal
    modal.classList.remove('hidden');
    console.log('Event modal should now be visible');
}

// Modal functions for editing tasks specifically  
function openEditTaskModal(taskId, childId, category, title, content, date) {
    console.log('openEditTaskModal called:', {taskId, childId, category, title, content, date});
    
    // Check if we're on the dashboard page with the modal
    const modal = document.getElementById('editTaskModal');
    if (!modal) {
        console.log('Task modal not found, redirecting...');
        // If modal doesn't exist, redirect to dashboard
        window.location.href = `/dashboard/?edit=task&id=${taskId}`;
        return;
    }

    console.log('Task modal found, proceeding with edit...');

    // Fill the form fields with null checks
    const childField = document.getElementById('edit_task_child');
    const titleField = document.getElementById('edit_task_title');
    const contentField = document.getElementById('edit_task_content');
    const dateField = document.getElementById('edit_task_date');
    const categoryField = document.getElementById('edit_task_category');
    const form = document.getElementById('editTaskForm');
    
    if (childField) childField.value = childId || '';
    if (titleField) titleField.value = title || '';
    if (contentField) contentField.value = content || '';
    if (dateField && date) dateField.value = date;
    if (categoryField) categoryField.value = category || 'none';

    // Set form action
    if (form) {
        form.action = `/save-entry/${taskId}/`;
    }

    // Show modal
    modal.classList.remove('hidden');
    console.log('Task modal should now be visible');
}

// Modal functions for editing notes
function openEditNoteModal(noteId, childId, title, content, date) {
    console.log('openEditNoteModal called:', {noteId, childId, title, content, date});
    
    // Check if we're on the dashboard page with the modal
    const modal = document.getElementById('editNoteModal');
    if (!modal) {
        console.log('Note modal not found, redirecting...');
        // If modal doesn't exist, redirect to dashboard
        window.location.href = `/dashboard/?edit=note&id=${noteId}`;
        return;
    }

    console.log('Note modal found, proceeding with edit...');
    
    const form = document.getElementById('editNoteForm');
    
    // Populate form fields with null checks
    const childField = document.getElementById('edit_note_child');
    const titleField = document.getElementById('edit_note_title');
    const contentField = document.getElementById('edit_note_content');
    const dateField = document.getElementById('edit_note_date');
    
    if (childField) childField.value = childId || '';
    if (titleField) titleField.value = title || '';
    if (contentField) contentField.value = content || '';
    if (dateField && date) dateField.value = date;
    
    // Set the form action to edit this specific note
    if (form) {
        form.action = `/edit-note/${noteId}/`;
    }
    
    // Show the modal
    modal.classList.remove('hidden');
    console.log('Note modal should now be visible');
}

// Modal functions for editing children
function openEditChildModal(childId, childData) {
    console.log('openEditChildModal called:', {childId, childData});
    
    // Check if we're on the dashboard page with the modal
    const modal = document.getElementById('editChildModal');
    if (!modal) {
        console.log('Child modal not found, redirecting...');
        // If modal doesn't exist, redirect to dashboard
        window.location.href = `/dashboard/?edit=child&id=${childId}`;
        return;
    }

    console.log('Child modal found, proceeding with edit...');
    
    const form = document.getElementById('editChildForm');
    
    // Populate form fields with null checks
    const nameField = document.getElementById('edit_child_name');
    const birthDateField = document.getElementById('edit_child_birth_date');
    const schoolField = document.getElementById('edit_child_school');
    const yearField = document.getElementById('edit_child_year');
    const classNameField = document.getElementById('edit_child_class_name');
    const colourField = document.getElementById('edit_child_colour');
    
    if (nameField) nameField.value = childData.name || '';
    if (birthDateField) birthDateField.value = childData.birth_date || '';
    if (schoolField) schoolField.value = childData.school || '';
    if (yearField) yearField.value = childData.year || '';
    if (classNameField) classNameField.value = childData.class_name || '';
    if (colourField) colourField.value = childData.colour || '';
    
    // Set the form action to save this specific child
    if (form) {
        form.action = `/save-child/${childId}/`;
    }
    
    // Show the modal
    modal.classList.remove('hidden');
    console.log('Child modal should now be visible');
}

// Close modal functions
function closeEditEventModal() {
    console.log('Closing event modal');
    const modal = document.getElementById('editEventModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function closeEditTaskModal() {
    console.log('Closing task modal');
    const modal = document.getElementById('editTaskModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function closeEditNoteModal() {
    console.log('Closing note modal');
    const modal = document.getElementById('editNoteModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function closeEditChildModal() {
    console.log('Closing child modal');
    const modal = document.getElementById('editChildModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Keep this for compatibility with any existing references
function closeEditEntryModal() {
    console.log('closeEditEntryModal called - this is deprecated');
    // Try to close any open modals
    closeEditEventModal();
    closeEditTaskModal();
}

// Delete functions
function deleteEvent() {
    console.log('deleteEvent called');
    if (confirm('Are you sure you want to delete this event?')) {
        const form = document.getElementById('editEventForm');
        console.log('Event form found:', !!form);
        if (form) {
            // Extract entry ID from the current action URL
            const currentAction = form.action;
            console.log('Current form action:', currentAction);
            const entryIdMatch = currentAction.match(/\/save-entry\/(\d+)\//);
            console.log('Entry ID match:', entryIdMatch);
            if (entryIdMatch) {
                const entryId = entryIdMatch[1];
                const deleteUrl = `/delete-entry/${entryId}/`;
                console.log('Setting form action to:', deleteUrl);
                form.action = deleteUrl;
                form.submit();
            } else {
                console.error('Could not extract entry ID from form action:', currentAction);
            }
        }
    }
}

function deleteTask() {
    console.log('deleteTask called');
    if (confirm('Are you sure you want to delete this task?')) {
        const form = document.getElementById('editTaskForm');
        console.log('Task form found:', !!form);
        if (form) {
            // Extract entry ID from the current action URL
            const currentAction = form.action;
            console.log('Current form action:', currentAction);
            const entryIdMatch = currentAction.match(/\/save-entry\/(\d+)\//);
            console.log('Entry ID match:', entryIdMatch);
            if (entryIdMatch) {
                const entryId = entryIdMatch[1];
                const deleteUrl = `/delete-entry/${entryId}/`;
                console.log('Setting form action to:', deleteUrl);
                form.action = deleteUrl;
                form.submit();
            } else {
                console.error('Could not extract entry ID from form action:', currentAction);
            }
        }
    }
}

function deleteNote() {
    console.log('deleteNote called');
    if (confirm('Are you sure you want to delete this note?')) {
        const form = document.getElementById('editNoteForm');
        console.log('Note form found:', !!form);
        if (form) {
            // Extract note ID from the current action URL
            const currentAction = form.action;
            console.log('Current form action:', currentAction);
            const noteIdMatch = currentAction.match(/\/edit-note\/(\d+)\//);
            console.log('Note ID match:', noteIdMatch);
            if (noteIdMatch) {
                const noteId = noteIdMatch[1];
                const deleteUrl = `/delete-entry/${noteId}/`;
                console.log('Setting form action to:', deleteUrl);
                form.action = deleteUrl;
                form.submit();
            } else {
                console.error('Could not extract note ID from form action:', currentAction);
            }
        }
    }
}

function deleteChild() {
    console.log('deleteChild called');
    if (confirm('Are you sure you want to delete this child profile? This will also delete all associated events, tasks, and notes.')) {
        const form = document.getElementById('editChildForm');
        console.log('Child form found:', !!form);
        if (form) {
            // Extract child ID from the current action URL
            const currentAction = form.action;
            console.log('Current form action:', currentAction);
            const childIdMatch = currentAction.match(/\/save-child\/(\d+)\//);
            console.log('Child ID match:', childIdMatch);
            if (childIdMatch) {
                const childId = childIdMatch[1];
                const deleteUrl = `/delete-child/${childId}/`;
                console.log('Setting form action to:', deleteUrl);
                form.action = deleteUrl;
                form.submit();
            } else {
                console.error('Could not extract child ID from form action:', currentAction);
            }
        }
    }
}
