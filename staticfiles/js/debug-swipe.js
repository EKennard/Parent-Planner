console.log('Simple swipe test loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - checking for swipe elements');
    
    const container = document.getElementById('swipeContainer');
    const content = document.getElementById('swipeContent');
    const indicators = document.querySelectorAll('.nav-indicator');
    
    console.log('Container found:', !!container);
    console.log('Content found:', !!content);
    console.log('Indicators found:', indicators.length);
    
    if (container) {
        console.log('Container classes:', container.className);
    }
    
    if (content) {
        console.log('Content classes:', content.className);
        console.log('Content style transform:', content.style.transform);
    }
    
    // Test clicking indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            console.log('Clicked indicator:', index);
            alert('Clicked indicator ' + index);
        });
    });
});
