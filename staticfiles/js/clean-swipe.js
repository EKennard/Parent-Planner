console.log('Clean swipe script loading...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready - initializing swipe');
    
    const swipeContainer = document.getElementById('swipeContainer');
    const swipeContent = document.getElementById('swipeContent');
    const indicators = document.querySelectorAll('.nav-indicator');
    
    if (!swipeContainer || !swipeContent) {
        console.log('Swipe elements not found');
        return;
    }
    
    console.log('Swipe elements found, setting up navigation');
    
    let currentSection = 1; // Start with timeline (middle)
    
    // Navigate to section
    function navigateToSection(section) {
        if (section < 0 || section > 2) return;
        console.log('Navigating to section:', section);
        
        currentSection = section;
        const translateX = -(section * 100);
        
        swipeContent.style.transform = `translateX(${translateX}%)`;
        swipeContent.style.transition = 'transform 0.3s ease-out';
        
        // Update indicators
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
    
    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            console.log('Indicator clicked:', index);
            navigateToSection(index);
        });
    });
    
    // Touch events
    let startX = 0;
    let endX = 0;
    
    swipeContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        console.log('Touch start at:', startX);
    });
    
    swipeContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        console.log('Touch end at:', endX);
        
        const deltaX = endX - startX;
        const threshold = 50;
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0 && currentSection > 0) {
                // Swipe right - previous section
                navigateToSection(currentSection - 1);
            } else if (deltaX < 0 && currentSection < 2) {
                // Swipe left - next section
                navigateToSection(currentSection + 1);
            }
        }
    });
    
    // Initialize to timeline (middle)
    navigateToSection(1);
    console.log('Swipe navigation initialized successfully');
});
