// Shared JavaScript functions for edit and delete operations across all pages

// Debug logging to help troubleshoot Heroku deployment
console.log('Edit-delete-functions.js loaded successfully');

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

    // Fill the form fields
    document.getElementById('edit_event_child').value = childId;
    document.getElementById('edit_event_title').value = title;
    document.getElementById('edit_event_content').value = content;
    if (date) {
        document.getElementById('edit_event_date').value = date;
    }

    // Set form action
    const form = document.getElementById('editEventForm');
    form.action = `/edit-entry/${eventId}/`;

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

    // Fill the form fields
    document.getElementById('edit_task_child').value = childId;
    document.getElementById('edit_task_title').value = title;
    document.getElementById('edit_task_content').value = content;
    if (date) {
        document.getElementById('edit_task_date').value = date;
    }

    // Set form action
    const form = document.getElementById('editTaskForm');
    form.action = `/edit-entry/${taskId}/`;

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
    
    // Populate form fields
    document.getElementById('edit_note_child').value = childId;
    document.getElementById('edit_note_title').value = title;
    document.getElementById('edit_note_content').value = content;
    if (date) {
        document.getElementById('edit_note_date').value = date;
    }
    
    // Set the form action to edit this specific note
    form.action = `/edit-note/${noteId}/`;
    
    // Show the modal
    modal.classList.remove('hidden');
    console.log('Note modal should now be visible');
}

// Modal functions for editing children
function openEditChildModal(childId, name, birthDate, allergies, medicalInfo, notes) {
    console.log('openEditChildModal called:', {childId, name, birthDate, allergies, medicalInfo, notes});
    
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
    
    // Populate form fields
    document.getElementById('edit_child_name').value = name;
    document.getElementById('edit_child_birth_date').value = birthDate;
    document.getElementById('edit_child_allergies').value = allergies || '';
    document.getElementById('edit_child_medical_info').value = medicalInfo || '';
    document.getElementById('edit_child_notes').value = notes || '';
    
    // Set the form action to edit this specific child
    form.action = `/edit-child/${childId}/`;
    
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
    if (confirm('Are you sure you want to delete this event?')) {
        const form = document.getElementById('editEventForm');
        if (form) {
            form.action = form.action.replace('/edit-entry/', '/delete-entry/');
            form.submit();
        }
    }
}

function deleteTask() {
    if (confirm('Are you sure you want to delete this task?')) {
        const form = document.getElementById('editTaskForm');
        if (form) {
            form.action = form.action.replace('/edit-entry/', '/delete-entry/');
            form.submit();
        }
    }
}

function deleteNote() {
    if (confirm('Are you sure you want to delete this note?')) {
        const form = document.getElementById('editNoteForm');
        if (form) {
            form.action = form.action.replace('/edit-note/', '/delete-note/');
            form.submit();
        }
    }
}

function deleteChild() {
    if (confirm('Are you sure you want to delete this child profile? This will also delete all associated events, tasks, and notes.')) {
        const form = document.getElementById('editChildForm');
        if (form) {
            form.action = form.action.replace('/edit-child/', '/delete-child/');
            form.submit();
        }
    }
}
