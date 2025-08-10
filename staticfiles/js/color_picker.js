/**
 * Color Picker Widget Functionality
 * Handles color selection in forms with visual feedback
 */

window.ColorPickerUtils = {
    /**
     * Select a color dot and update the associated select element
     */
    selectColorDot: function(dot, selectId) {
        const color = dot.dataset.color;
        const select = document.getElementById(selectId);
        
        if (select) {
            select.value = color;
            select.dispatchEvent(new Event('change'));
        }
        
        // Update visual selection
        const widget = dot.closest('.color-grid-widget');
        if (widget) {
            widget.querySelectorAll('.color-dot').forEach(d => {
                d.classList.remove('selected');
            });
            dot.classList.add('selected');
        }
    },

    /**
     * Initialize color picker functionality
     */
    initialize: function() {
        // Set initial selection when page loads
        const select = document.getElementById('id_colour');
        if (select && select.value) {
            const selectedDot = document.querySelector(`[data-color="${select.value}"]`);
            if (selectedDot) {
                this.selectColorDot(selectedDot, 'id_colour');
            }
        } else {
            // Default to first color
            const firstDot = document.querySelector('.color-dot');
            if (firstDot && select) {
                this.selectColorDot(firstDot, 'id_colour');
            }
        }
    }
};

// Export function to global scope for compatibility with existing HTML onclick attributes
window.selectColorDot = function(dot, selectId) {
    window.ColorPickerUtils.selectColorDot(dot, selectId);
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    window.ColorPickerUtils.initialize();
});
