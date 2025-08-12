// Shared JavaScript functions for edit and delete operations across all pages

// Modal functions for editing entries
function openEditEntryModal(entryId, childId, category, title, content, date) {
    // Check if we're on the dashboard page with the modal
    const modal = document.getElementById('editEntryModal');
    if (!modal) {
        // If modal doesn't exist, redirect to dashboard
        window.location.href = `/dashboard/?edit=entry&id=${entryId}`;
        return;
    }
    
    const form = document.getElementById('editEntryForm');
    
    // Populate form fields
    document.getElementById('edit_entry_child').value = childId;
    document.getElementById('edit_entry_category').value = category;
    document.getElementById('edit_entry_title').value = title;
    document.getElementById('edit_entry_content').value = content;
    document.getElementById('edit_entry_date').value = date;
    
    // Set form action
    form.action = '/edit_entry/' + entryId + '/';
    
    // Show modal
    modal.classList.remove('hidden');
}

function closeEditEntryModal() {
    const modal = document.getElementById('editEntryModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function deleteEntry() {
    const form = document.getElementById('editEntryForm');
    const entryTitle = document.getElementById('edit_entry_title').value;
    
    if (confirm(`Are you sure you want to delete "${entryTitle}"? This action cannot be undone.`)) {
        const deleteForm = document.createElement('form');
        deleteForm.method = 'post';
        deleteForm.action = form.action.replace('/edit_entry/', '/delete_entry/');
        
        const csrfToken = document.createElement('input');
        csrfToken.type = 'hidden';
        csrfToken.name = 'csrfmiddlewaretoken';
        csrfToken.value = document.querySelector('[name=csrfmiddlewaretoken]').value;
        
        deleteForm.appendChild(csrfToken);
        document.body.appendChild(deleteForm);
        deleteForm.submit();
    }
}

// Modal functions for editing events specifically
function openEditEventModal(eventId, childId, category, title, content, date) {
    // Check if we're on the dashboard page with the modal
    const modal = document.getElementById('editEntryModal');
    if (!modal) {
        // If modal doesn't exist, redirect to dashboard
        window.location.href = `/dashboard/?edit=entry&id=${eventId}`;
        return;
    }

    // Set modal title to indicate it's for events
    const modalTitle = modal.querySelector('h2');
    if (modalTitle) {
        modalTitle.textContent = 'Edit Event';
    }

    // Fill the form fields
    document.getElementById('edit_entry_child').value = childId;
    document.getElementById('edit_entry_category').value = 'event';
    document.getElementById('edit_entry_title').value = title;
    document.getElementById('edit_entry_content').value = content;
    if (date) {
        document.getElementById('edit_entry_date').value = date;
    }

    // Set form action
    const form = document.getElementById('editEntryForm');
    form.action = `/edit-entry/${eventId}/`;

    // Show modal
    modal.classList.remove('hidden');
}

// Modal functions for editing tasks specifically  
function openEditTaskModal(taskId, childId, category, title, content, date) {
    // Check if we're on the dashboard page with the modal
    const modal = document.getElementById('editEntryModal');
    if (!modal) {
        // If modal doesn't exist, redirect to dashboard
        window.location.href = `/dashboard/?edit=entry&id=${taskId}`;
        return;
    }

    // Set modal title to indicate it's for tasks
    const modalTitle = modal.querySelector('h2');
    if (modalTitle) {
        modalTitle.textContent = 'Edit Task';
    }

    // Fill the form fields
    document.getElementById('edit_entry_child').value = childId;
    document.getElementById('edit_entry_category').value = 'task';
    document.getElementById('edit_entry_title').value = title;
    document.getElementById('edit_entry_content').value = content;
    if (date) {
        document.getElementById('edit_entry_date').value = date;
    }

    // Set form action
    const form = document.getElementById('editEntryForm');
    form.action = `/edit-entry/${taskId}/`;

    // Show modal
    modal.classList.remove('hidden');
}

// Modal functions for editing notes
function openEditNoteModal(noteId, childId, title, content, date) {
    // Check if we're on the dashboard page with the modal
    const modal = document.getElementById('editNoteModal');
    if (!modal) {
        // If modal doesn't exist, redirect to dashboard
        window.location.href = `/dashboard/?edit=note&id=${noteId}`;
        return;
    }
    
    const form = document.getElementById('editNoteForm');
    
    // Populate form fields
    document.getElementById('edit_note_child').value = childId;
    document.getElementById('edit_note_title').value = title;
    document.getElementById('edit_note_content').value = content;
    document.getElementById('edit_note_date').value = date;
    
    // Set form action
    form.action = '/edit_note/' + noteId + '/';
    
    // Show modal
    modal.classList.remove('hidden');
}

function closeEditNoteModal() {
    const modal = document.getElementById('editNoteModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function deleteNote() {
    const form = document.getElementById('editNoteForm');
    const noteTitle = document.getElementById('edit_note_title').value;
    
    if (confirm(`Are you sure you want to delete "${noteTitle}"? This action cannot be undone.`)) {
        const deleteForm = document.createElement('form');
        deleteForm.method = 'post';
        deleteForm.action = form.action.replace('/edit_note/', '/delete_note/');
        
        const csrfToken = document.createElement('input');
        csrfToken.type = 'hidden';
        csrfToken.name = 'csrfmiddlewaretoken';
        csrfToken.value = document.querySelector('[name=csrfmiddlewaretoken]').value;
        
        deleteForm.appendChild(csrfToken);
        document.body.appendChild(deleteForm);
        deleteForm.submit();
    }
}

// Modal functions for editing children
function openEditChildModal(childId, childData) {
    // Check if we're on the dashboard page with the modal
    const modal = document.getElementById('editChildModal');
    if (!modal) {
        // If modal doesn't exist, redirect to edit child page
        window.location.href = `/edit_child/${childId}/`;
        return;
    }
    
    // Populate the form with child data
    document.getElementById('edit_child_name').value = childData.name;
    document.getElementById('edit_child_birth_date').value = childData.birth_date;
    document.getElementById('edit_child_school').value = childData.school || '';
    document.getElementById('edit_child_year').value = childData.year || '';
    document.getElementById('edit_child_class_name').value = childData.class_name || '';
    document.getElementById('edit_child_colour').value = childData.colour;
    
    // Set the form action to the edit URL
    document.getElementById('editChildForm').action = '/edit_child/' + childId + '/';
    
    // Select the correct color dot
    const colorDots = document.querySelectorAll('#editChildModal .color-dot');
    colorDots.forEach(dot => {
        dot.classList.remove('selected');
        if (dot.getAttribute('data-color') === childData.colour) {
            dot.classList.add('selected');
        }
    });
    
    // Show the modal
    modal.classList.remove('hidden');
}

function closeEditChildModal() {
    const modal = document.getElementById('editChildModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Delete confirmation functions
function deleteEntryConfirm(entryId, entryTitle) {
    if (confirm(`Are you sure you want to delete "${entryTitle}"? This action cannot be undone.`)) {
        const deleteForm = document.createElement('form');
        deleteForm.method = 'post';
        deleteForm.action = '/delete_entry/' + entryId + '/';
        
        const csrfToken = document.createElement('input');
        csrfToken.type = 'hidden';
        csrfToken.name = 'csrfmiddlewaretoken';
        csrfToken.value = document.querySelector('[name=csrfmiddlewaretoken]').value;
        
        deleteForm.appendChild(csrfToken);
        document.body.appendChild(deleteForm);
        deleteForm.submit();
    }
}

function deleteNoteConfirm(noteId, noteTitle) {
    if (confirm(`Are you sure you want to delete "${noteTitle}"? This action cannot be undone.`)) {
        const deleteForm = document.createElement('form');
        deleteForm.method = 'post';
        deleteForm.action = '/delete_note/' + noteId + '/';
        
        const csrfToken = document.createElement('input');
        csrfToken.type = 'hidden';
        csrfToken.name = 'csrfmiddlewaretoken';
        csrfToken.value = document.querySelector('[name=csrfmiddlewaretoken]').value;
        
        deleteForm.appendChild(csrfToken);
        document.body.appendChild(deleteForm);
        deleteForm.submit();
    }
}

function deleteChildConfirm(childId, childName) {
    if (confirm(`Are you sure you want to delete ${childName}? This action cannot be undone and will also delete all associated entries and notes.`)) {
        const deleteForm = document.createElement('form');
        deleteForm.method = 'post';
        deleteForm.action = '/delete_child/' + childId + '/';
        
        const csrfToken = document.createElement('input');
        csrfToken.type = 'hidden';
        csrfToken.name = 'csrfmiddlewaretoken';
        csrfToken.value = document.querySelector('[name=csrfmiddlewaretoken]').value;
        
        deleteForm.appendChild(csrfToken);
        document.body.appendChild(deleteForm);
        deleteForm.submit();
    }
}
