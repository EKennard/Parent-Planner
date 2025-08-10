/**
 * Dashboard JavaScript - Optimized for performance
 * Handles entry interactions, AJAX loading, and responsive behavior
 */

console.log('Dashboard JavaScript file loaded');

// Immediately define global functions to prevent errors
(function() {
    'use strict';
    
    console.log('Dashboard IIFE started');
    
    // Global functions for template compatibility
    window.toggleEntryDetails = function(entryId) {
        const detailsSection = document.getElementById(`entry-details-${entryId}`);
        const toggleIcon = document.getElementById(`toggle-icon-${entryId}`);
        
        if (!detailsSection || !toggleIcon) return;
        
        if (detailsSection.classList.contains('hidden')) {
            detailsSection.classList.remove('hidden');
            toggleIcon.textContent = '▲';
        } else {
            detailsSection.classList.add('hidden');
            toggleIcon.textContent = '▼';
        }
    };

    window.toggleCompletion = function(entryId) {
        const checkbox = document.getElementById(`complete-${entryId}`);
        if (!checkbox) return;
        
        // AJAX call to toggle completion
        fetch(`/toggle-completion/${entryId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const label = checkbox.nextElementSibling;
                if (label) label.textContent = checkbox.checked ? 'Done' : 'To Do';
            }
        })
        .catch(error => console.error('Error:', error));
    };

    window.confirmDelete = function(entryTitle, deleteUrl) {
        if (confirm(`Delete "${entryTitle}"? This cannot be undone.`)) {
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
    };

    // Modal functions
    window.openAddChildModal = function() {
        const modal = document.getElementById('addChildModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    };

    window.closeAddChildModal = function() {
        const modal = document.getElementById('addChildModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    };

    window.openEditChildModal = function(childData) {
        const modal = document.getElementById('editChildModal');
        if (modal && childData) {
            // Populate form fields with child data
            if (childData.name) {
                const nameField = document.getElementById('edit_child_name');
                if (nameField) nameField.value = childData.name;
            }
            if (childData.birth_date) {
                const birthField = document.getElementById('edit_child_birth_date');
                if (birthField) birthField.value = childData.birth_date;
            }
            if (childData.school) {
                const schoolField = document.getElementById('edit_child_school');
                if (schoolField) schoolField.value = childData.school;
            }
            if (childData.year) {
                const yearField = document.getElementById('edit_child_year');
                if (yearField) yearField.value = childData.year;
            }
            
            modal.classList.remove('hidden');
        }
    };

    window.closeEditChildModal = function() {
        const modal = document.getElementById('editChildModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    };

    // Mobile filter toggle function
    window.toggleMobileFilter = function() {
        const dropdown = document.getElementById('mobileFilterDropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    };

    // Close mobile filter when clicking outside
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('mobileFilterDropdown');
        const filterButton = event.target.closest('[onclick="toggleMobileFilter()"]');
        
        if (dropdown && !dropdown.classList.contains('hidden') && !filterButton && !dropdown.contains(event.target)) {
            dropdown.classList.add('hidden');
        }
    });

    // Dashboard utilities
    window.DashboardUtils = {
        // Lazy load timeline content for better performance
        loadTimelineContent: function(containerId, url) {
            const container = document.getElementById(containerId);
            if (!container) return;

            fetch(url)
                .then(response => response.text())
                .then(html => {
                    container.innerHTML = html;
                })
                .catch(error => {
                    container.innerHTML = '<div class="text-center py-8 text-red-600">Failed to load content</div>';
                });
        },

        // Initialize dashboard functionality
        initialize: function() {
            console.log('Dashboard JavaScript loaded and initializing...');
            console.log('About to call initMobileSwipe...');
            // Set up any additional dashboard features
            console.log('Dashboard initialized');
            
            // Initialize mobile swipe navigation
            this.initMobileSwipe();
            console.log('initMobileSwipe called completed');
        },

        // Mobile swipe navigation
        initMobileSwipe: function() {
            console.log('initMobileSwipe called');
            
            const swipeContainer = document.getElementById('swipeContainer');
            const swipeContent = document.getElementById('swipeContent');
            const indicators = document.querySelectorAll('.nav-indicator');
            
            console.log('Swipe elements - Container:', !!swipeContainer, 'Content:', !!swipeContent, 'Indicators:', indicators.length);
            
            if (!swipeContainer || !swipeContent) {
                console.log('Swipe elements not found, skipping initialization');
                return;
            }

            let currentSection = 1; // Start with timeline (middle)

            console.log('Setting up swipe navigation');

            // Update indicators
            function updateIndicators() {
                console.log('Updating indicators, current section:', currentSection);
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('bg-primary', index === currentSection);
                    indicator.classList.toggle('bg-gray-300', index !== currentSection);
                });
            }

            // Navigate to section
            function navigateToSection(section) {
                if (section < 0 || section > 2) return;
                console.log('Navigating to section:', section);
                currentSection = section;
                const translateX = -(section * 100);
                swipeContent.style.transform = `translateX(${translateX}%)`;
                swipeContent.style.transition = 'transform 0.3s ease-out';
                updateIndicators();
            }

            // Indicator click navigation
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    console.log('Indicator clicked:', index);
                    navigateToSection(index);
                });
            });

            // Touch events for mobile
            let startX = 0;
            let currentX = 0;
            let isDragging = false;

            swipeContainer.addEventListener('touchstart', (e) => {
                console.log('Touch start');
                startX = e.touches[0].clientX;
                isDragging = true;
                swipeContent.style.transition = 'none';
            }, { passive: true });

            swipeContainer.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
                currentX = e.touches[0].clientX;
                const deltaX = currentX - startX;
                const currentTranslate = -(currentSection * 100);
                const newTranslate = currentTranslate + (deltaX / swipeContainer.offsetWidth * 100);
                swipeContent.style.transform = `translateX(${newTranslate}%)`;
            }, { passive: false });

            swipeContainer.addEventListener('touchend', () => {
                if (!isDragging) return;
                console.log('Touch end');
                isDragging = false;
                
                const deltaX = currentX - startX;
                const threshold = 50;
                
                if (Math.abs(deltaX) > threshold) {
                    if (deltaX > 0 && currentSection > 0) {
                        navigateToSection(currentSection - 1);
                    } else if (deltaX < 0 && currentSection < 2) {
                        navigateToSection(currentSection + 1);
                    } else {
                        navigateToSection(currentSection);
                    }
                } else {
                    navigateToSection(currentSection);
                }
            }, { passive: true });

            // Initialize
            navigateToSection(1); // Start with timeline (middle)
            console.log('Swipe navigation initialized successfully');
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.DashboardUtils.initialize);
    } else {
        window.DashboardUtils.initialize();
    }
})();
