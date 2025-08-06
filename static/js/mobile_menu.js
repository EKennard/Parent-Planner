/**
 * Mobile Menu Navigation
 * Handles mobile hamburger menu toggle functionality
 */

window.MobileMenuUtils = {
    /**
     * Initialize mobile menu functionality
     */
    initialize: function() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
                // Toggle menu icon between bars and X
                if (menuIcon) {
                    menuIcon.classList.toggle('fa-bars');
                    menuIcon.classList.toggle('fa-times');
                }
            });
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    window.MobileMenuUtils.initialize();
});
