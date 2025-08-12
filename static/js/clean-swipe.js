console.log('Clean swipe script loading...');

// Debug function to check dropdown elements
window.debugDropdown = function() {
    console.log('=== DROPDOWN ELEMENTS DEBUG ===');
    const button = document.getElementById('filterButton');
    const dropdown = document.getElementById('filterDropdown');
    const mobileDropdown = document.getElementById('mobileFilterDropdown');
    
    console.log('Filter button:', button);
    console.log('Desktop dropdown:', dropdown);
    console.log('Mobile dropdown:', mobileDropdown);
    
    if (dropdown) {
        console.log('Desktop dropdown classes:', dropdown.className);
        console.log('Desktop dropdown style display:', dropdown.style.display);
        console.log('Desktop dropdown computed display:', window.getComputedStyle(dropdown).display);
    }
    
    if (mobileDropdown) {
        console.log('Mobile dropdown classes:', mobileDropdown.className);
        console.log('Mobile dropdown style display:', mobileDropdown.style.display);
        console.log('Mobile dropdown computed display:', window.getComputedStyle(mobileDropdown).display);
    }
    
    console.log('=== END DEBUG ===');
};

// Force show dropdown for testing
window.forceShowDropdown = function() {
    const dropdown = document.getElementById('filterDropdown');
    const mobileDropdown = document.getElementById('mobileFilterDropdown');
    
    if (dropdown) {
        dropdown.classList.remove('hidden');
        dropdown.style.position = 'fixed';
        dropdown.style.top = '200px';
        dropdown.style.left = '200px';
        dropdown.style.zIndex = '9999';
        dropdown.style.backgroundColor = 'white';
        dropdown.style.border = '2px solid red';
        dropdown.style.padding = '10px';
        console.log('Desktop dropdown force shown');
    }
    
    if (mobileDropdown) {
        mobileDropdown.classList.remove('hidden');
        console.log('Mobile dropdown force shown');
    }
};

// Filter dropdown functionality is no longer needed since we have separate sections
// Tasks and Events are now in separate dedicated sections

function createDropdownAtPosition(left, top) {
    console.log('Creating dropdown at position:', { left, top });
    
    // Ensure the dropdown stays within screen bounds
    const dropdownWidth = 160;
    let finalLeft = left;
    let finalTop = top;
    
    // Adjust if it would go off the right edge
    if (finalLeft + dropdownWidth > window.innerWidth) {
        finalLeft = window.innerWidth - dropdownWidth - 10;
    }
    
    // Ensure it doesn't go off the left edge
    if (finalLeft < 10) {
        finalLeft = 10;
    }
    
    // Ensure it doesn't go off the top
    if (finalTop < 10) {
        finalTop = 10;
    }
    
    console.log('Final adjusted position:', { left: finalLeft, top: finalTop });
    
    const dropdown = document.createElement('div');
    dropdown.id = 'customFilterDropdown';
    
    dropdown.style.cssText = `
        position: fixed !important;
        top: ${finalTop}px !important;
        left: ${finalLeft}px !important;
        background: white !important;
        border: 2px solid #4F46E5 !important;
        border-radius: 0 !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        z-index: 999999 !important;
        width: ${dropdownWidth}px !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        overflow: hidden !important;
    `;
    
    // Get current filter type from URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentType = urlParams.get('type') || '';
    
    dropdown.innerHTML = `
        <a href="?type=" style="display: block; padding: 12px 16px; font-size: 14px; color: #374151; text-decoration: none; border-bottom: 1px solid #e5e7eb; ${currentType === '' ? 'background-color: #4F46E5; color: white;' : ''}" 
           onmouseover="if(this.style.backgroundColor !== 'rgb(79, 70, 229)') this.style.backgroundColor='#f3f4f6'" 
           onmouseout="if(this.style.color !== 'white') this.style.backgroundColor='white'">
            <i class="fas fa-list" style="margin-right: 8px; width: 16px;"></i>All Entries
        </a>
        <a href="?type=task" style="display: block; padding: 12px 16px; font-size: 14px; color: #d97706; text-decoration: none; border-bottom: 1px solid #e5e7eb; ${currentType === 'task' ? 'background-color: #d97706; color: white;' : ''}" 
           onmouseover="if(this.style.backgroundColor !== 'rgb(217, 119, 6)') this.style.backgroundColor='#fef3c7'" 
           onmouseout="if(this.style.color !== 'white') this.style.backgroundColor='white'">
            <i class="fas fa-tasks" style="margin-right: 8px; width: 16px;"></i>Tasks Only
        </a>
        <a href="?type=event" style="display: block; padding: 12px 16px; font-size: 14px; color: #7c3aed; text-decoration: none; ${currentType === 'event' ? 'background-color: #7c3aed; color: white;' : ''}" 
           onmouseover="if(this.style.backgroundColor !== 'rgb(124, 58, 237)') this.style.backgroundColor='#ede9fe'" 
           onmouseout="if(this.style.color !== 'white') this.style.backgroundColor='white'">
            <i class="fas fa-calendar" style="margin-right: 8px; width: 16px;"></i>Events Only
        </a>
    `;
    
    document.body.appendChild(dropdown);
    console.log('Fixed position dropdown created');
    
    // Add click outside listener
    setTimeout(() => {
        document.addEventListener('click', function closeCustomDropdown(event) {
            if (!dropdown.contains(event.target)) {
                dropdown.remove();
                document.removeEventListener('click', closeCustomDropdown);
                console.log('Fixed position dropdown closed');
            }
        });
    }, 0);
}

function createTestDropdown() {
    console.log('Creating test dropdown at fixed position');
    const dropdown = document.createElement('div');
    dropdown.id = 'customFilterDropdown';
    
    dropdown.style.cssText = `
        position: fixed !important;
        top: 200px !important;
        left: 400px !important;
        background: white !important;
        border: 3px solid red !important;
        border-radius: 0 !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        z-index: 999999 !important;
        width: 160px !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        overflow: hidden !important;
        padding: 10px !important;
    `;
    
    dropdown.innerHTML = `
        <div style="font-weight: bold; color: red; margin-bottom: 10px;">TEST DROPDOWN</div>
        <a href="?type=" style="display: block; padding: 8px; color: blue; text-decoration: none;">All Entries</a>
        <a href="?type=task" style="display: block; padding: 8px; color: blue; text-decoration: none;">Tasks Only</a>
        <a href="?type=event" style="display: block; padding: 8px; color: blue; text-decoration: none;">Events Only</a>
    `;
    
    document.body.appendChild(dropdown);
    console.log('Test dropdown created');
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (dropdown.parentNode) {
            dropdown.remove();
            console.log('Test dropdown auto-removed');
        }
    }, 5000);
}

function createDropdownAtButton(button, buttonRect) {
    console.log('Creating dropdown at button position');
    
    const dropdown = document.createElement('div');
    dropdown.id = 'customFilterDropdown';
    
    // Position it below and aligned to the right edge of the button
    const left = buttonRect.right - 160; // Align right edge of dropdown with right edge of button
    const top = buttonRect.bottom + 2; // Small gap below button
    
    console.log('Dropdown will be positioned at:', { left, top });
    
    dropdown.style.cssText = `
        position: fixed !important;
        top: ${top}px !important;
        left: ${left}px !important;
        background: white !important;
        border: 2px solid #4F46E5 !important;
        border-radius: 0 !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        z-index: 999999 !important;
        width: 160px !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        overflow: hidden !important;
    `;
    
    // Get current filter type from URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentType = urlParams.get('type') || '';
    
    dropdown.innerHTML = `
        <a href="?type=" style="display: block; padding: 12px 16px; font-size: 14px; color: #374151; text-decoration: none; border-bottom: 1px solid #e5e7eb; ${currentType === '' ? 'background-color: #4F46E5; color: white;' : ''}" 
           onmouseover="if(this.style.backgroundColor !== 'rgb(79, 70, 229)') this.style.backgroundColor='#f3f4f6'" 
           onmouseout="if(this.style.color !== 'white') this.style.backgroundColor='white'">
            <i class="fas fa-list" style="margin-right: 8px; width: 16px;"></i>All Entries
        </a>
        <a href="?type=task" style="display: block; padding: 12px 16px; font-size: 14px; color: #d97706; text-decoration: none; border-bottom: 1px solid #e5e7eb; ${currentType === 'task' ? 'background-color: #d97706; color: white;' : ''}" 
           onmouseover="if(this.style.backgroundColor !== 'rgb(217, 119, 6)') this.style.backgroundColor='#fef3c7'" 
           onmouseout="if(this.style.color !== 'white') this.style.backgroundColor='white'">
            <i class="fas fa-tasks" style="margin-right: 8px; width: 16px;"></i>Tasks Only
        </a>
        <a href="?type=event" style="display: block; padding: 12px 16px; font-size: 14px; color: #7c3aed; text-decoration: none; ${currentType === 'event' ? 'background-color: #7c3aed; color: white;' : ''}" 
           onmouseover="if(this.style.backgroundColor !== 'rgb(124, 58, 237)') this.style.backgroundColor='#ede9fe'" 
           onmouseout="if(this.style.color !== 'white') this.style.backgroundColor='white'">
            <i class="fas fa-calendar" style="margin-right: 8px; width: 16px;"></i>Events Only
        </a>
    `;
    
    // Add to body
    document.body.appendChild(dropdown);
    console.log('Custom dropdown created and added to DOM');
    
    // Verify it was added
    const addedDropdown = document.getElementById('customFilterDropdown');
    if (addedDropdown) {
        const rect = addedDropdown.getBoundingClientRect();
        console.log('Dropdown successfully added. Position:', rect);
    } else {
        console.log('ERROR: Dropdown was not added to DOM');
    }
    
    // Add click outside listener
    setTimeout(() => {
        document.addEventListener('click', function closeCustomDropdown(event) {
            if (!dropdown.contains(event.target) && !button.contains(event.target)) {
                dropdown.remove();
                document.removeEventListener('click', closeCustomDropdown);
                console.log('Custom dropdown closed');
            }
        });
    }, 0);
    
    console.log('=== CUSTOM DROPDOWN READY ===');
}

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

function closeDropdownOutside(event) {
    const dropdown = document.getElementById('filterDropdown');
    const button = document.getElementById('filterButton');
    
    if (dropdown && !dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.classList.add('hidden');
        document.removeEventListener('click', closeDropdownOutside);
        console.log('Dropdown closed by outside click');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('filterDropdown');
    const mobileDropdown = document.getElementById('mobileFilterDropdown');
    const button = event.target.closest('button[onclick="toggleFilterDropdown()"]');
    
    if (!button) {
        if (dropdown && !dropdown.contains(event.target)) {
            dropdown.classList.add('hidden');
        }
        if (mobileDropdown && !mobileDropdown.contains(event.target)) {
            mobileDropdown.classList.add('hidden');
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready - checking for elements');
    
    // Check if filter dropdown exists (should work on all screen sizes)
    const filterDropdown = document.getElementById('filterDropdown');
    console.log('Filter dropdown found:', !!filterDropdown);
    
    // Swipe functionality (for mobile, tablet, and 1024px screens)
    const swipeContainer = document.getElementById('swipeContainer');
    const swipeContent = document.getElementById('swipeContent');
    const indicators = document.querySelectorAll('.nav-indicator');
    
    console.log('Swipe elements - Container:', !!swipeContainer, 'Content:', !!swipeContent, 'Indicators:', indicators.length);
    
    // Only initialize swipe if elements exist (mobile, tablet, and 1024px screens)
    if (swipeContainer && swipeContent) {
        console.log('Initializing swipe navigation for mobile/tablet/1024px screens');
        initializeSwipeNavigation(swipeContainer, swipeContent, indicators);
    } else {
        console.log('Swipe elements not found - desktop screen or elements missing');
    }
});

// Swipe navigation initialization (separated for clarity)
function initializeSwipeNavigation(swipeContainer, swipeContent, indicators) {
    let currentSection = 1; // Start with events section
    
    // Navigate to section
    function navigateToSection(section) {
        console.log('navigateToSection called with section:', section);
        console.log('Valid range: 0-3, current section:', currentSection);
        
        if (section < 0 || section > 3) {
            console.log('Section out of range, returning');
            return;
        }
        
        console.log('Navigating to section:', section);
        
        currentSection = section;
        const translateX = -(section * 100);
        
        console.log('Setting transform to:', `translateX(${translateX}%)`);
        swipeContent.style.transform = `translateX(${translateX}%)`;
        swipeContent.style.transition = 'transform 0.3s ease-out';
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentSection) {
                indicator.classList.remove('bg-gray-300');
                indicator.classList.add('bg-primary');
                console.log('Activated indicator:', index);
            } else {
                indicator.classList.remove('bg-primary');
                indicator.classList.add('bg-gray-300');
            }
        });
        
        console.log('Navigation complete. Current section is now:', currentSection);
    }
    
    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            console.log('Indicator clicked for section:', index);
            console.log('Available sections: 0=Profile, 1=Events, 2=Tasks, 3=Notes');
            navigateToSection(index);
        });
        
        // Make indicators more visible and clickable
        indicator.style.cursor = 'pointer';
        indicator.style.minWidth = '16px';
        indicator.style.minHeight = '16px';
    });
    
    // Touch events
    let startX = 0;
    let endX = 0;
    
    swipeContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        console.log('Touch start at:', startX, 'Current section:', currentSection);
    });
    
    swipeContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        console.log('Touch end at:', endX, 'Current section:', currentSection);
        
        const deltaX = endX - startX;
        const threshold = 30; // Reduced threshold for easier swiping
        
        console.log('Delta X:', deltaX, 'Threshold:', threshold);
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0 && currentSection > 0) {
                // Swipe right - previous section
                console.log('Swiping right from section', currentSection, 'to section', currentSection - 1);
                navigateToSection(currentSection - 1);
            } else if (deltaX < 0 && currentSection < 3) {
                // Swipe left - next section  
                console.log('Swiping left from section', currentSection, 'to section', currentSection + 1);
                navigateToSection(currentSection + 1);
            } else {
                console.log('Swipe ignored - at boundary or insufficient delta');
            }
        } else {
            console.log('Swipe too small, ignored');
        }
    });
    
    // Initialize to events section
    navigateToSection(1);
    console.log('Swipe navigation initialized successfully for 4 sections');
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

function closeFilterDropdownNew(event) {
    const dropdown = document.getElementById('filterDropdownNew');
    const button = document.getElementById('filterButton');
    
    if (dropdown && !dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.remove();
        document.removeEventListener('click', closeFilterDropdownNew);
    }
}
