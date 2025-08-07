/**
 * Dashboard JavaScript Functionality
 * Handles entry filtering, completion toggling, expandable cards, and UI interactions
 * Enhanced for Heroku deployment reliability
 */

console.log('Dashboard.js loading...');

// Immediately define global functions to prevent "not defined" errors
// Use try-catch for error handling
(function() {
    'use strict';
    
    console.log('Dashboard.js initializing functions...');

    // Immediately define global functions to prevent "not defined" errors
    window.toggleEntryDetails = function(entryId) {
        console.log('toggleEntryDetails called with entryId:', entryId);
        
        try {
            // Direct implementation without waiting for DashboardUtils
            const detailsSection = document.getElementById('entry-details-' + entryId);
            const toggleIcon = document.getElementById('toggle-icon-' + entryId);
            
            console.log('Details section found:', !!detailsSection);
            console.log('Toggle icon found:', !!toggleIcon);
            
            if (!detailsSection || !toggleIcon) {
                console.error('Could not find elements for entry:', entryId);
                return;
            }
            
            if (detailsSection.classList.contains('hidden')) {
                // Expand the card
                detailsSection.classList.remove('hidden');
                toggleIcon.style.transform = 'rotate(180deg)';
                toggleIcon.textContent = '▲';
                console.log('Entry expanded:', entryId);
            } else {
                // Collapse the card
                detailsSection.classList.add('hidden');
                toggleIcon.style.transform = 'rotate(0deg)';
                toggleIcon.textContent = '▼';
                console.log('Entry collapsed:', entryId);
            }
        } catch (error) {
            console.error('Error in toggleEntryDetails:', error);
        }
    };

    window.toggleDetails = function(detailsId) {
        try {
            const details = document.getElementById(detailsId);
            const button = details ? details.previousElementSibling : null;
            
            if (!details) return;
            
            if (details.classList.contains('hidden')) {
                details.classList.remove('hidden');
                if (button) button.innerHTML = 'Hide Details ▲';
            } else {
                details.classList.add('hidden');
                if (button) button.innerHTML = 'View Details ▼';
            }
        } catch (error) {
            console.error('Error in toggleDetails:', error);
        }
    };

    window.toggleCompletion = function(entryId) {
        try {
            const checkbox = document.getElementById('complete-' + entryId);
            const label = checkbox ? checkbox.nextElementSibling : null;
            
            if (!checkbox) return;
            
            // Use basic functionality that doesn't rely on external utilities
            if (label) {
                label.textContent = checkbox.checked ? 'Done' : 'To Do';
            }
            
            // If DashboardUtils is available, use advanced functionality
            if (window.DashboardUtils && window.DashboardUtils.toggleCompletion) {
                window.DashboardUtils.toggleCompletion(entryId);
            }
        } catch (error) {
            console.error('Error in toggleCompletion:', error);
        }
    };

    window.confirmDelete = function(entryTitle, deleteUrl) {
        try {
            if (confirm('Are you sure you want to delete "' + entryTitle + '"? This action cannot be undone.')) {
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = deleteUrl;

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
        } catch (error) {
            console.error('Error in confirmDelete:', error);
        }
    };

    window.toggleEntryType = function(entryType) {
        try {
            // If DashboardUtils is available, use it; otherwise use basic functionality
            if (window.DashboardUtils && window.DashboardUtils.toggleEntryType) {
                window.DashboardUtils.toggleEntryType(entryType);
            } else {
                // Basic fallback functionality
                const button = document.getElementById('filter-' + entryType);
                const entries = document.querySelectorAll('.entry-card[data-entry-type="' + entryType + '"]');
                
                if (!button) return;
                
                const isActive = button.classList.contains('border-4');
                
                if (isActive) {
                    // Hide entries
                    entries.forEach(entry => entry.style.display = 'none');
                    button.classList.remove('border-4');
                    button.classList.add('border');
                } else {
                    // Show entries  
                    entries.forEach(entry => entry.style.display = 'block');
                    button.classList.remove('border');
                    button.classList.add('border-4');
                }
            }
        } catch (error) {
            console.error('Error in toggleEntryType:', error);
        }
    };

    console.log('Global functions defined successfully');
})();

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

// Initialize on page load with multiple fallbacks
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired, initializing dashboard...');
    window.DashboardUtils.initialize();
});

// Also ensure it runs if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOMContentLoaded event fired, initializing dashboard...');
        window.DashboardUtils.initialize();
    });
} else {
    console.log('DOM already loaded, initializing dashboard immediately...');
    window.DashboardUtils.initialize();
}
