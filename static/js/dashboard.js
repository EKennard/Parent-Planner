/**
 * Dashboard JavaScript Functionality
 * Handles entry filtering, completion toggling, expandable cards, and UI interactions
 */

console.log('Dashboard.js loaded successfully');

// Global dashboard utilities
window.DashboardUtils = {
    // Entry filtering system
    activeFilters: new Set(['note', 'task', 'event']), // All types visible by default

    /**
     * Toggle expandable entry card details
     */
    toggleEntryDetails: function(entryId) {
        console.log('Toggling entry:', entryId); // Debug logging
        
        const detailsSection = document.getElementById(`entry-details-${entryId}`);
        const toggleIcon = document.getElementById(`toggle-icon-${entryId}`);
        
        console.log('Details section:', detailsSection);
        console.log('Toggle icon:', toggleIcon);
        
        if (!detailsSection || !toggleIcon) {
            console.error('Could not find elements for entry:', entryId);
            return;
        }
        
        if (detailsSection.classList.contains('hidden')) {
            // Expand the card
            detailsSection.classList.remove('hidden');
            toggleIcon.style.transform = 'rotate(180deg)';
            toggleIcon.textContent = '▲';
        } else {
            // Collapse the card
            detailsSection.classList.add('hidden');
            toggleIcon.style.transform = 'rotate(0deg)';
            toggleIcon.textContent = '▼';
        }
    },

    /**
     * Toggle details section visibility (legacy support)
     */
    toggleDetails: function(detailsId) {
        const details = document.getElementById(detailsId);
        const button = details.previousElementSibling;
        
        if (details.classList.contains('hidden')) {
            details.classList.remove('hidden');
            button.innerHTML = 'Hide Details ▲';
        } else {
            details.classList.add('hidden');
            button.innerHTML = 'View Details ▼';
        }
    },

    /**
     * Toggle completion status via AJAX
     */
    toggleCompletion: function(entryId) {
        const checkbox = document.getElementById(`complete-${entryId}`);
        const label = checkbox.nextElementSibling;
        
        // Create form and submit via fetch
        fetch(`/toggle-completion/${entryId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(response => {
            if (response.ok) {
                // Update label text based on checkbox state
                label.textContent = checkbox.checked ? 'Done' : 'To Do';
                
                // Show success feedback
                this.showToast(checkbox.checked ? 'Marked as complete!' : 'Marked as incomplete!');
            } else {
                // Revert checkbox if request failed
                checkbox.checked = !checkbox.checked;
                this.showToast('Failed to update status', 'error');
            }
        })
        .catch(error => {
            // Revert checkbox if request failed
            checkbox.checked = !checkbox.checked;
            this.showToast('Failed to update status', 'error');
        });
    },

    /**
     * Simple toast notification
     */
    showToast: function(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white z-50 ${
            type === 'error' ? 'bg-red-500' : 'bg-green-500'
        }`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    },

    /**
     * Confirm deletion with user prompt
     */
    confirmDelete: function(entryTitle, deleteUrl) {
        if (confirm(`Are you sure you want to delete "${entryTitle}"? This action cannot be undone.`)) {
            // Create a form and submit it for POST request
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = deleteUrl;

            // Add CSRF token
            const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
            if (csrfToken) {
                const csrfInput = document.createElement('input');
                csrfInput.type = 'hidden';
                csrfInput.name = 'csrfmiddlewaretoken';
                csrfInput.value = csrfToken.value;
                form.appendChild(csrfInput);
            }

            document.body.appendChild(form);
            form.submit();
        }
    },

    /**
     * Toggle entry type visibility in filters
     */
    toggleEntryType: function(entryType) {
        const button = document.querySelector(`[onclick*="toggleEntryType('${entryType}')"]`);
        
        if (this.activeFilters.has(entryType)) {
            // Hide this type - remove bold outline
            this.activeFilters.delete(entryType);
            button.classList.remove('border-4');
            if (entryType === 'note') {
                button.classList.remove('border-green-800');
                button.classList.add('border', 'border-green-600');
            } else if (entryType === 'task') {
                button.classList.remove('border-amber-800');
                button.classList.add('border', 'border-amber-600');
            } else if (entryType === 'event') {
                button.classList.remove('border-violet-800');
                button.classList.add('border', 'border-violet-600');
            }
        } else {
            // Show this type - add bold outline
            this.activeFilters.add(entryType);
            button.classList.remove('border');
            button.classList.add('border-4');
            if (entryType === 'note') {
                button.classList.remove('border-green-600');
                button.classList.add('border-green-800');
            } else if (entryType === 'task') {
                button.classList.remove('border-amber-600');
                button.classList.add('border-amber-800');
            } else if (entryType === 'event') {
                button.classList.remove('border-violet-600');
                button.classList.add('border-violet-800');
            }
        }
        
        // Update entry visibility
        this.updateEntryVisibility();
    },

    /**
     * Update visibility of entries based on active filters
     */
    updateEntryVisibility: function() {
        const entries = document.querySelectorAll('.entry-card');
        let visibleCount = 0;
        
        entries.forEach(entry => {
            const entryType = entry.getAttribute('data-entry-type');
            
            if (this.activeFilters.has(entryType)) {
                entry.style.display = 'block';
                visibleCount++;
            } else {
                entry.style.display = 'none';
            }
        });
        
        // Show/hide "no entries" message if needed
        const noEntriesMsg = document.getElementById('no-entries-message');
        if (visibleCount === 0 && entries.length > 0) {
            if (!noEntriesMsg) {
                const timeline = document.querySelector('.space-y-4');
                const message = document.createElement('div');
                message.id = 'no-entries-message';
                message.className = 'text-center text-gray-500 p-8';
                message.innerHTML = '<p class="text-lg">No entries match the selected filters</p><p class="text-sm mt-2">Try enabling different entry types above</p>';
                timeline.appendChild(message);
            }
        } else if (noEntriesMsg) {
            noEntriesMsg.remove();
        }
    },

    /**
     * Initialize dashboard functionality
     */
    initialize: function() {
        console.log('DashboardUtils.initialize() called');
        
        // Set all filter buttons to active state with bold borders initially
        const noteBtn = document.getElementById('filter-note');
        const taskBtn = document.getElementById('filter-task');
        const eventBtn = document.getElementById('filter-event');
        
        if (noteBtn) noteBtn.classList.add('border-4', 'border-green-800');
        if (taskBtn) taskBtn.classList.add('border-4', 'border-amber-800');
        if (eventBtn) eventBtn.classList.add('border-4', 'border-violet-800');

        // Add smooth scrolling to any anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        console.log('DashboardUtils initialization complete');
    }
};

// Export functions to global scope for compatibility with existing HTML onclick attributes
window.toggleEntryDetails = function(entryId) {
    console.log('toggleEntryDetails called with entryId:', entryId);
    
    // Check if DashboardUtils exists
    if (!window.DashboardUtils) {
        console.error('DashboardUtils not found!');
        return;
    }
    
    window.DashboardUtils.toggleEntryDetails(entryId);
};

window.toggleDetails = function(detailsId) {
    window.DashboardUtils.toggleDetails(detailsId);
};

window.toggleCompletion = function(entryId) {
    window.DashboardUtils.toggleCompletion(entryId);
};

window.confirmDelete = function(entryTitle, deleteUrl) {
    window.DashboardUtils.confirmDelete(entryTitle, deleteUrl);
};

window.toggleEntryType = function(entryType) {
    window.DashboardUtils.toggleEntryType(entryType);
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired, initializing dashboard...');
    window.DashboardUtils.initialize();
});
