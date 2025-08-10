console.log('Test swipe script loaded successfully!');

// Simple swipe functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready - looking for swipe elements');
    
    const swipeContainer = document.getElementById('swipeContainer');
    const swipeContent = document.getElementById('swipeContent');
    const indicators = document.querySelectorAll('.nav-indicator');
    
    console.log('Swipe container:', swipeContainer);
    console.log('Swipe content:', swipeContent);
    console.log('Indicators:', indicators.length);
    
    if (!swipeContainer || !swipeContent) {
        console.log('Swipe elements not found');
        return;
    }
    
    let currentSection = 1; // Start with timeline (middle)
    
    // Update indicators
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentSection) {
                indicator.classList.remove('bg-gray-300');
                indicator.classList.add('bg-primary');
            } else {
                indicator.classList.remove('bg-primary');
                indicator.classList.add('bg-gray-300');
            }
        });
    }
    
    // Navigate to section
    function navigateToSection(section) {
        if (section < 0 || section > 2) return;
        console.log('Navigating to section:', section);
        currentSection = section;
        const translateX = -(section * 100);
        swipeContent.style.transform = `translateX(${translateX}%)`;
        updateIndicators();
    }
    
    // Indicator click navigation
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            console.log('Indicator clicked:', index);
            navigateToSection(index);
        });
    });
    
    // Simple touch events
    let startX = 0;
    let currentX = 0;
    
    swipeContainer.addEventListener('touchstart', (e) => {
        console.log('Touch start');
        startX = e.touches[0].clientX;
    });
    
    swipeContainer.addEventListener('touchend', (e) => {
        console.log('Touch end');
        currentX = e.changedTouches[0].clientX;
        const deltaX = currentX - startX;
        const threshold = 50;
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0 && currentSection > 0) {
                navigateToSection(currentSection - 1);
            } else if (deltaX < 0 && currentSection < 2) {
                navigateToSection(currentSection + 1);
            }
        }
    });
    
    // Initialize
    updateIndicators();
    console.log('Swipe navigation initialized');
});
