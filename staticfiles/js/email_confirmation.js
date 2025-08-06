/**
 * Email Management Functionality
 * Handles email confirmation and removal prompts
 */

window.EmailUtils = {
    /**
     * Initialize email management functionality
     */
    initialize: function() {
        // Handle email removal confirmation
        const message = "Do you really want to remove the selected email address?";
        const actions = document.getElementsByName('action_remove');
        
        if (actions.length) {
            actions[0].addEventListener("click", function(e) {
                if (!confirm(message)) {
                    e.preventDefault();
                }
            });
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    window.EmailUtils.initialize();
});
