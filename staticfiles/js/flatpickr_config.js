/**
 * Flatpickr Configuration and Styling
 * Provides unified datetime picker functionality with custom violet theme
 * across all ParentPlanner templates
 */

// Global Flatpickr utilities
window.FlatpickrUtils = {
    /**
     * Apply custom violet theme styling to Flatpickr calendars
     * Uses direct DOM manipulation to ensure consistent styling
     */
    applyCustomFlatpickrStyles: function() {
        // Wait for Flatpickr calendars to be created, then apply styles
        setTimeout(() => {
            const calendars = document.querySelectorAll('.flatpickr-calendar');
            calendars.forEach(calendar => {
                // Apply main calendar styles
                calendar.style.background = '#ffffff';
                calendar.style.border = '2px solid #4F46E5';
                calendar.style.borderRadius = '8px';
                calendar.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
                calendar.style.fontFamily = "'Poppins', 'Nunito', system-ui, sans-serif";
                
                // Style the months header
                const months = calendar.querySelector('.flatpickr-months');
                if (months) {
                    months.style.background = '#4F46E5';
                    months.style.borderRadius = '6px 6px 0 0';
                }
                
                // Style current month text
                const currentMonth = calendar.querySelectorAll('.flatpickr-current-month, .flatpickr-current-month *');
                currentMonth.forEach(element => {
                    element.style.color = 'white';
                    element.style.fontWeight = '700';
                });
                
                // Style navigation arrows
                const navArrows = calendar.querySelectorAll('.flatpickr-prev-month, .flatpickr-next-month');
                navArrows.forEach(arrow => {
                    arrow.style.color = 'white';
                    arrow.style.fill = 'white';
                });
                
                // Style days
                const selectedDays = calendar.querySelectorAll('.flatpickr-day.selected');
                selectedDays.forEach(day => {
                    day.style.background = '#4F46E5';
                    day.style.borderColor = '#4F46E5';
                    day.style.color = 'white';
                });
                
                const todayDays = calendar.querySelectorAll('.flatpickr-day.today');
                todayDays.forEach(day => {
                    day.style.background = '#F59E0B';
                    day.style.color = 'white';
                });
            });
        }, 100);
    },

    /**
     * Common Flatpickr configuration object
     * Provides consistent settings across all datetime inputs
     */
    getDefaultConfig: function() {
        return {
            enableTime: true,
            dateFormat: "Y-m-d H:i:S",
            altInput: true,
            altFormat: "d-m-Y at H:i",
            time_24hr: false,
            minuteIncrement: 15,
            onReady: this.applyCustomFlatpickrStyles,
            onOpen: this.applyCustomFlatpickrStyles,
            onMonthChange: this.applyCustomFlatpickrStyles,
            onYearChange: this.applyCustomFlatpickrStyles
        };
    },

    /**
     * Initialize Flatpickr on a specific input element
     * @param {HTMLElement} inputElement - The input element to initialize
     * @param {Object} additionalConfig - Additional configuration options
     * @returns {Object} The Flatpickr instance
     */
    initializeDatetimePicker: function(inputElement, additionalConfig = {}) {
        if (!inputElement) return null;
        
        const config = { 
            ...this.getDefaultConfig(), 
            ...additionalConfig,
            onChange: (selectedDates, dateStr, instance) => {
                this.applyCustomFlatpickrStyles();
                // Call any additional onChange callback
                if (additionalConfig.onChange) {
                    additionalConfig.onChange(selectedDates, dateStr, instance);
                }
            }
        };
        
        return flatpickr(inputElement, config);
    },

    /**
     * Auto-initialize all datetime inputs on page load
     * Looks for common datetime input IDs and applies Flatpickr
     */
    autoInitialize: function() {
        document.addEventListener('DOMContentLoaded', () => {
            // Common datetime input selectors
            const selectors = [
                'input[type="datetime-local"]',
                'input[name*="date"]',
                'input[name*="time"]',
                '#id_due_date',
                '#id_start_time', 
                '#id_end_time'
            ];
            
            selectors.forEach(selector => {
                const inputs = document.querySelectorAll(selector);
                inputs.forEach(input => {
                    // Skip if already initialized
                    if (input._flatpickr) return;
                    
                    this.initializeDatetimePicker(input);
                });
            });
        });
    }
};

// Auto-initialize on page load
window.FlatpickrUtils.autoInitialize();
