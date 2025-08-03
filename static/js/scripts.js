
// hamberger menu button for mobiles
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    // if mobile menu button and menu exist
    if (mobileMenuButton && mobileMenu && menuIcon) {
        mobileMenuButton.addEventListener('click', function () {
            // toggle hidden class mobile menu
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                // change hamburger icon to X icon
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                mobileMenu.classList.add('hidden');
                // change X icon back to hamburger icon
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
        
        // event listeners to links in mobile menu
        const mobileLinks = mobileMenu.querySelectorAll('a');
        for (let i = 0; i < mobileLinks.length; i++) {
            // close mobile menu on link click
            mobileLinks[i].addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
                // reset to hamburger icon
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        }
        
        // close mobile menu when clicking outside
        document.addEventListener('click', function (event) {
            const clickedInsideButton = mobileMenuButton.contains(event.target);
            const clickedInsideMenu = mobileMenu.contains(event.target);
            
            // hide menu when clicked outside
            if (!clickedInsideButton && !clickedInsideMenu) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    // reset to hamburger icon
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });
        
    } else {
        console.log('Mobile menu elements not found');
    }
});
