console.log('Clean swipe script loading...');

// Simple test function
function testDropdown() {
    console.log('TEST FUNCTION CALLED!');
    
    // Remove any existing test dropdown
    const existingDropdown = document.getElementById('testDropdown');
    if (existingDropdown) {
        existingDropdown.remove();
        console.log('Removed existing dropdown');
    }
    
    // Create a completely new dropdown element with JavaScript
    const dropdown = document.createElement('div');
    dropdown.id = 'testDropdown';
    dropdown.style.cssText = `
        position: fixed !important;
        top: 100px !important;
        left: 100px !important;
        background-color: red !important;
        color: white !important;
        padding: 20px !important;
        border: 5px solid yellow !important;
        border-radius: 10px !important;
        z-index: 999999 !important;
        font-size: 18px !important;
        font-weight: bold !important;
        width: 250px !important;
        height: 150px !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
    `;
    dropdown.innerHTML = `
        <p>JAVASCRIPT CREATED DROPDOWN!</p>
        <p>This should definitely be visible!</p>
        <button onclick="this.parentElement.remove()" style="background: white; color: red; padding: 5px; margin-top: 10px;">Close</button>
    `;
    
    // Add to body
    document.body.appendChild(dropdown);
    
    // Check if it was actually added
    const addedDropdown = document.getElementById('testDropdown');
    if (addedDropdown) {
        const rect = addedDropdown.getBoundingClientRect();
        console.log('Dropdown created and added to body');
        console.log('Dropdown position:', rect);
        console.log('Dropdown computed styles:', window.getComputedStyle(addedDropdown));
        console.log('Dropdown is in viewport?', rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth);
        
        // Try to scroll it into view
        addedDropdown.scrollIntoView();
        
        alert(`Dropdown created at position: top=${rect.top}, left=${rect.left}, width=${rect.width}, height=${rect.height}`);
    } else {
        console.log('ERROR: Dropdown was not added to DOM');
        alert('ERROR: Dropdown was not added to DOM');
    }
}

// Filter dropdown functionality - works on all screen sizes
function toggleFilterDropdown() {
    console.log('Filter dropdown toggled');
    let dropdown = document.getElementById('filterDropdown');
    const button = document.getElementById('filterButton');
    
    if (!dropdown || !button) {
        console.log('Elements not found - dropdown:', !!dropdown, 'button:', !!button);
        return;
    }
    
    const isHidden = dropdown.classList.contains('hidden');
    
    if (isHidden) {
        // Show dropdown
        dropdown.classList.remove('hidden');
        
        // Position dropdown relative to button using fixed positioning
        const buttonRect = button.getBoundingClientRect();
        dropdown.style.position = 'fixed';
        dropdown.style.top = (buttonRect.bottom + 4) + 'px';
        dropdown.style.left = (buttonRect.right - 140) + 'px'; // 140px is dropdown width
        dropdown.style.zIndex = '9999';
        
        console.log('Dropdown shown at:', dropdown.style.top, dropdown.style.left);
        
        // Add click outside listener
        setTimeout(() => {
            document.addEventListener('click', closeDropdownOutside);
        }, 0);
    } else {
        // Hide dropdown
        dropdown.classList.add('hidden');
        document.removeEventListener('click', closeDropdownOutside);
        console.log('Dropdown hidden');
    }
}

function closeDropdownOutside(event) {
    const dropdown = document.getElementById('filterDropdown');
    const button = document.getElementById('filterButton');
    
    if (dropdown && !dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.classList.add('hidden');
        document.removeEventListener('click', closeDropdownOutside);
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('filterDropdown');
    const button = event.target.closest('button[onclick="toggleFilterDropdown()"]');
    
    if (dropdown && !button && !dropdown.contains(event.target)) {
        dropdown.classList.add('hidden');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready - checking for elements');
    
    // Check if filter dropdown exists (should work on all screen sizes)
    const filterDropdown = document.getElementById('filterDropdown');
    console.log('Filter dropdown found:', !!filterDropdown);
    
    // Swipe functionality (only for mobile)
    const swipeContainer = document.getElementById('swipeContainer');
    const swipeContent = document.getElementById('swipeContent');
    const indicators = document.querySelectorAll('.nav-indicator');
    
    console.log('Swipe elements - Container:', !!swipeContainer, 'Content:', !!swipeContent, 'Indicators:', indicators.length);
    
    // Only initialize swipe if elements exist (mobile screens)
    if (swipeContainer && swipeContent) {
        console.log('Initializing swipe navigation for mobile');
        initializeSwipeNavigation(swipeContainer, swipeContent, indicators);
    } else {
        console.log('Swipe elements not found - desktop screen or elements missing');
    }
});

// Swipe navigation initialization (separated for clarity)
function initializeSwipeNavigation(swipeContainer, swipeContent, indicators) {
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
}

// New working filter dropdown functionality
function toggleFilterDropdown() {
    console.log('Filter dropdown toggled');
    
    // Remove any existing dropdown
    const existingDropdown = document.getElementById('filterDropdownNew');
    if (existingDropdown) {
        existingDropdown.remove();
        console.log('Removed existing dropdown');
        return;
    }
    
    // Get button position - try multiple ways to find the button
    let button = document.getElementById('filterButton');
    if (!button) {
        // Try finding by class or other selectors
        button = document.querySelector('[onclick*="toggleFilterDropdown"]');
        console.log('Found button by onclick:', !!button);
    }
    
    if (!button) {
        console.log('Filter button not found');
        return;
    }
    
    // Wait a moment for any layout changes, then get position
    setTimeout(() => {
        const buttonRect = button.getBoundingClientRect();
        console.log('Button rect after timeout:', buttonRect);
        
        if (buttonRect.width === 0 || buttonRect.height === 0) {
            console.log('Button has no dimensions, using fallback positioning');
            // Fallback - position in top right of timeline section
            createDropdownAtPosition(500, 150);
        } else {
            createDropdownAtPosition(buttonRect.left, buttonRect.bottom + 4);
        }
    }, 50);
}

function createDropdownAtPosition(left, top) {
    // Calculate position - ensure it stays within screen bounds
    const dropdownWidth = 150;
    let leftPosition = left;
    
    // If dropdown would go off the right edge, adjust position
    if (leftPosition + dropdownWidth > window.innerWidth) {
        leftPosition = left - dropdownWidth; // Position to the left of the click point
    }
    
    // Ensure it doesn't go off the left edge
    if (leftPosition < 0) {
        leftPosition = 10; // Small margin from left edge
    }
    
    console.log('Final positioning:', {
        left: leftPosition,
        top: top,
        screenWidth: window.innerWidth
    });
    
    // Create dropdown with corrected positioning
    const dropdown = document.createElement('div');
    dropdown.id = 'filterDropdownNew';
    
    // Use simple CSS without nesting
    dropdown.style.cssText = `
        position: fixed !important;
        top: ${top}px !important;
        left: ${leftPosition}px !important;
        background: white !important;
        border: 2px solid #4F46E5 !important;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
        z-index: 999999 !important;
        width: ${dropdownWidth}px !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
    `;
    
    dropdown.innerHTML = `
        <a href="?type=" style="display: block; padding: 12px 16px; font-size: 14px; color: #374151; text-decoration: none; font-weight: 500; border-bottom: 1px solid #e5e7eb;" onmouseover="this.style.backgroundColor='#f3f4f6'" onmouseout="this.style.backgroundColor='white'">
            <i class="fas fa-list" style="margin-right: 8px;"></i>All Items
        </a>
        <a href="?type=task" style="display: block; padding: 12px 16px; font-size: 14px; color: #d97706; text-decoration: none; font-weight: 500; border-bottom: 1px solid #e5e7eb;" onmouseover="this.style.backgroundColor='#fef3c7'" onmouseout="this.style.backgroundColor='white'">
            <i class="fas fa-check-square" style="margin-right: 8px;"></i>Tasks Only
        </a>
        <a href="?type=event" style="display: block; padding: 12px 16px; font-size: 14px; color: #7c3aed; text-decoration: none; font-weight: 500;" onmouseover="this.style.backgroundColor='#ede9fe'" onmouseout="this.style.backgroundColor='white'">
            <i class="fas fa-calendar" style="margin-right: 8px;"></i>Events Only
        </a>
    `;
    
    // Add to body
    document.body.appendChild(dropdown);
    
    // Add click outside listener
    setTimeout(() => {
        document.addEventListener('click', closeFilterDropdownNew);
    }, 0);
    
    console.log('Filter dropdown created and positioned');
}
}

function closeFilterDropdownNew(event) {
    const dropdown = document.getElementById('filterDropdownNew');
    const button = document.getElementById('filterButton');
    
    if (dropdown && !dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.remove();
        document.removeEventListener('click', closeFilterDropdownNew);
    }
}
