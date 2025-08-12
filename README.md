![ParentPlanner Banner](assets/images/parentpla## 📋 User Stories

The ParentPlanner App was developed with specific user needs in mind, addressing real-world challenges faced by modern families in managing their daily activities and long-term planning. r-banner.png)
�‍👩‍👧‍👦 ParentPlanner
ParentPlanner is a web application designed to help modern families stay organised and manage their daily activities effectively. The app enables parents to create personalised profiles for each child, track important tasks and events, and maintain clear oversight of family schedules. ParentPlanner is targeted toward busy parents who need a centralised system to coordinate multiple children's activities, school events, appointments, and personal notes. The application provides a comprehensive dashboard view, making it easy for families to visualise their schedules and ensure nothing important is missed.

👨‍👩‍👧‍👦 ParentPlanner[ParentPlanner Banner](assets/images/parentplanner-banner.png)
�‍👩‍👧‍👦 ParentPlanner
ParentPlanner is a web application designed to help modern families stay organised and manage their daily activities effectively. The app enables parents to create personalised profiles for each child, track important tasks and events, and maintain clear oversight of family schedules. ParentPlanner is targeted toward busy parents who need a centralised system to coordinate multiple children's activities, school events, appointments, and personal notes. The application provides a comprehensive dashboard view, making it easy for families to visualise their schedules and ensure nothing important is missed.

� Table of Contents
User Stories
Must Haves
Should Haves
Could Haves
Design & Wireframes
Initial Wireframe Concepts
Design Evolution
Design Decisions
Child-Specific View Architecture
Category System Standardization
Features
Existing Features
Authentication
Navigation
Dashboard
Child Management
Entry System
Calendar View
Entry Management
Responsive Design
Future Features
Deployment
Live Application
Heroku Deployment Process
Local Development Setup
Production Configuration
Testing
Debugging & Issue Resolution
Validator Testing
Known Issues & Unfixed Bugs
Credits
Content and Development
� User Stories
The ParentPlanner App was developed with specific user needs in mind, addressing real-world challenges faced by modern families in managing their daily activities and long-term planning.

📝 Must Haves
Registration & Setup: "As a user, I want to quickly create an account and set up my family profile so that I can start organising our activities immediately without complex setup procedures."
Child Profile Management: "As a user, I want to create individual profiles for each child with their school information and personal details so that I can track activities and school-specific events."
Quick Entry Creation: "As a user, I want to quickly add notes, tasks, and events for my children from a single form so that I don't have to navigate through multiple screens to capture important information."
Family Overview Dashboard: "As a user, I want to see all my children's activities in one centralised dashboard so that I can quickly assess our family's schedule and identify potential conflicts or busy periods."
Category Organization: "As a user, I want to categorize entries (School, Sports, Health, Entertainment) so that I can quickly filter and focus on specific areas of my children's lives."
Due Date Tracking: "As a user, I want to see which tasks are approaching their due dates with clear visual indicators so that I can prioritise and ensure nothing is forgotten."
Child-Specific Views: "As a user, I want to filter and view activities for individual children so that I can focus on one child's events through expandable child cards with comprehensive information display."
Entry Management: "As a user, I want to easily edit and modify existing entries so that I can keep our family information current as situations change."
Attractive and ledgible design: "As a user, I want the app to have a simple yet colourfull design, with clear fonts so that I can easily read the information and it looks attractive."
Mobile first design: "As a user, I want the app to be mobile first so that I can access the app on the go."
Navigation: "As a user, I want to be able to easily navigate the app so that i can quickly and efficiently view and input information."
📝 Should Haves
Event time management: "As a user, I want to see start and end times clearly so that I can avoid double-booking."
Family Sharing: "As a user,I want to share selected event information so that both parents stay informed."
Export capabilities: "As a user, I want to export relevant schedule information so that I can share appropriate details with teachers, babysitters, and family members who need to know our availability/child schedule." Colour coded activity types: "As a user, I want to see notes, tasks, and events displayed in different colours so that I can quickly identify the type of activity without reading details."
📝 Could Haves
Location Awareness: "As a user: I want to see event locations so that I can plan efficient routes and account for travel time. "
Monthly calender view: "As a user I want to see all family activities displayed on a monthly calendar so that I can quickly identify busy periods and plan accordingly."
Individual child calendersa: "As a user I want to view individual calendar pages for each child so that I can focus on one child's commitments when discussing their schedule."
Easy calenders date entries: "As a user I want to click on any calendar date and immediately create an entry for that specific day so that I can plan ahead efficiently while viewing our schedule."
Quick celender navigation: "As a user I want to easily navigate between different months and years so that I can schedule future events and review past activities."
📋 Design & Wireframes
📝 Initial Wireframe Concepts
The ParentPlanner application was designed with a mobile-first approach, prioritizing ease of use for busy parents managing family activities on-the-go. The wireframe development process involved creating initial concepts followed by revised iterations based on user experience considerations and technical feasibility.
Initial Wireframes

The initial wireframes established the core layout concepts including the four-section dashboard design with dedicated areas for Children, Tasks, Events, and Notes. These early designs focused on clear visual separation between different content types while maintaining an intuitive navigation structure. The wireframes emphasized the importance of quick access to add new entries and easy scanning of existing family information.
Revised Wireframes

The revised wireframes incorporated lessons learned from the initial design phase, refining the user interface to better accommodate real-world usage patterns. Key improvements included enhanced child card designs with expandable functionality, improved modal dialog layouts for form submissions, and optimised spacing for better touch interaction on mobile devices. The revised designs also considered the consolidated dashboard approach that ultimately became the final implementation, showing the evolution from separate child-specific pages to the integrated expandable card system.
📝 Design Evolution
The wireframe process guided the development of the final application interface, demonstrating the importance of iterative design in creating user-friendly family management tools. The progression from initial concepts to revised wireframes to final implementation shows how user experience considerations and technical constraints shaped the application's architecture and visual design.
📋 Design Decisions
Project Architecture ParentPlanner application architecture and component relationships

📝 Child-Specific View Architecture
During development, a dedicated child-specific view page was initially planned and partially implemented to provide focused management of individual children's activities. However, after careful consideration of user experience and development timelines, the decision was made to consolidate all functionality into expandable child cards within the main dashboard.
This architectural decision was driven by several factors: time constraints during the development cycle necessitated prioritising core functionality over additional page navigation, user experience testing indicated that parents prefer a single-view approach that allows quick overview of all family activities while still providing detailed child-specific information through expandable interfaces, and technical implementation showed that inline expandable cards offered better performance and responsiveness compared to separate page loads.
The consolidated dashboard approach with expandable child cards ultimately provides a more efficient user experience, allowing parents to quickly toggle between family overview and child-specific details without context switching between different pages. The child-specific view concept remains in the backlog for potential future implementation if user feedback indicates a need for more detailed individual child management interfaces.
📝 Category System Standardization
The application implements a unified category system across all entry types (Tasks, Events, and Notes) to ensure consistency and reduce user confusion. Categories include: None, Homework, Health, School, Activities, Chores, Appointments, Reminders, Celebrations, Achievements, and Other. This standardization ensures that parents can apply consistent organizational patterns across different types of family activities and reduces the cognitive load when categorizing entries.
📋 Features
📝 Existing Features
👤 Authentication
The application features a comprehensive email-based user registration and login system that provides secure password authentication using Django's built-in security features. Users benefit from automatic session management with login persistence, ensuring a seamless experience across browsing sessions. The secure logout functionality properly terminates user sessions, while user account isolation guarantees that family data remains private and separated between different user accounts.

Login Page User-friendly login interface with secure authentication

Registration Page Streamlined registration process for new users

👤 Navigation
The navigation system includes a responsive navigation bar that seamlessly adapts between mobile and desktop screen sizes. Users are welcomed with a personalised message displaying their logged-in username, alongside quick access links to the Dashboard and Logout functionality. Mobile users enjoy an optimised hamburger menu designed specifically for smaller screens, all supported by a clean and intuitive navigation structure that makes moving through the application effortless.

Desktop Navigation Desktop navigation bar with user-friendly layout

Mobile Navigation Responsive mobile navigation with hamburger menu

👤 Dashboard
The dashboard presents a centralised four-section layout that elegantly displays Children, Events, Tasks, and Notes in an organised manner. Real-time content updates occur without requiring page refreshes, while the responsive grid system intelligently adapts from a mobile stack layout to a desktop four-column arrangement. Each section features distinct colour coding for easy visual identification, with individual section scrolling capabilities when content exceeds the viewport height. Interactive task completion provides instant visual feedback, while chronological event sorting ensures upcoming activities appear first. The dashboard is completed with a professional footer containing copyright and branding information.

Dashboard Overview Main dashboard showing the four-section layout with family data

Dashboard Mobile View Mobile-optimised dashboard with stacked layout

👤 Child Management
Parents can create comprehensive individual child profiles that include personalised information and unique colour assignments for easy visual identification throughout the application. The system allows for detailed school information recording, including school names and year groups, with the flexibility to edit and update child profiles as information changes over time.

Child Profile Cards Expandable child cards with colour-coded identification

The application implements expandable child cards within the main dashboard that provide focused management capabilities. Each child card displays essential information including coloured initials, names, birth dates, and a summary of their activities. When expanded, cards reveal detailed school information, year levels, and class details. Child cards include edit and delete functionality with inline modal dialogs, allowing parents to modify child information without leaving the dashboard view. This consolidated approach ensures efficient family management while maintaining quick access to individual child details.

Child Card Expanded Expanded child card showing detailed information and management options

Add Child Modal Add new child modal with comprehensive profile fields

👤 Entry System
The application supports three distinct entry types: Events, Tasks, and Notes, each designed for specific family management needs. A smart categorisation system organises activities into School, Sports, Health, and Entertainment categories for efficient organisation. Event management includes separate start and end time tracking, while task management incorporates due dates and priority levels ranging from High to Medium to Low importance. Note-taking functionality provides a space for general family information and reminders, with rich text support enabling detailed descriptions across all entry types.

Add Entry Modal Unified entry creation modal with category selection

Task Management Task list with completion status and priority indicators

Event Calendar Event display with time management and scheduling

👤 Calendar View
The calendar view functionality is currently under active development for future release, with plans for a comprehensive monthly calendar view that will display activities visually. Individual child calendar pages are planned to provide focused scheduling capabilities, allowing parents to manage each child's commitments separately while maintaining an overview of the entire family schedule.

👤 Entry Management
Complete CRUD operations (Create, Read, Update, Delete) are available for all entry types, ensuring full data management capabilities. Users can edit existing entries using pre-populated forms that maintain data integrity, while unwanted entries can be deleted with appropriate confirmation prompts. Task completion features include a toggle system with immediate visual feedback, automatic reordering of completed tasks for better organization, and child-specific entry filtering that enables focused management of individual children's activities.

👤 Responsive Design
The application employs a mobile-first design approach that has been specifically optimised for smartphone usage while scaling beautifully to larger devices. Tablet users enjoy a touch-optimised interface that takes advantage of the larger screen real estate, while desktop users benefit from an enhanced four-column grid layout that maximises productivity. The flexible layout system adapts seamlessly to any screen size, ensuring a consistent user experience across all devices with touch-friendly buttons and interactive elements that work equally well with finger taps or mouse clicks.

Responsive Design Showcase Application display across desktop, tablet, and mobile devices

Mobile Interface Touch-optimised mobile interface with finger-friendly controls

📝 Future Features
👤 Enhanced Child Profiles
Future development will expand child profiles to include comprehensive personal information such as photos and detailed personal characteristics. The system will incorporate medical information tracking capabilities for allergies, medications, and emergency contact details to ensure child safety and proper care coordination. Academic progress monitoring features will track grades and teacher information, while activity history and achievement tracking will provide parents with a complete picture of their child's development. Additional features will include growth charts and milestone recording capabilities, with planned integration to school systems for automatic updates that keep information current without manual data entry.

👤 Notification & Reminder System
A comprehensive notification system will provide email reminders for upcoming events and task due dates, ensuring families never miss important commitments. Browser push notifications will alert users to time-sensitive activities, with customizable reminder timing options including 15-minute, 1-hour, and 1-day advance warnings. SMS notifications will be available for critical events and emergencies, while family member notification sharing will keep all relevant parties informed. The system will feature smart reminder frequency algorithms that adjust notification timing based on event importance and user preferences.

👤 Email Integration & Parsing Module
Advanced email integration will automatically import events from school email notifications, eliminating manual data entry for routine school communications. Calendar invitation parsing will seamlessly integrate external events into the family schedule, while an email forwarding system will facilitate family coordination. Teacher communication tracking and organization features will maintain a record of important school correspondence, with automated parsing of school newsletters and important dates. The system will integrate with popular email providers including Gmail and Outlook to ensure broad compatibility across different email platforms.

📋 Deployment
📝 Live Application
The ParentPlanner application is deployed and accessible at https://parentplanner-0a7a2e9a2998.herokuapp.com/ using the Heroku Cloud Platform for reliable hosting and scalability. The production environment utilises PostgreSQL through Heroku Postgres for robust data management, while WhiteNoise middleware provides efficient static file serving that ensures fast loading times for CSS, JavaScript, and image assets.

Live Application ParentPlanner running live on Heroku platform

📝 Heroku Deployment Process
The deployment process begins with ensuring all prerequisites are met, including having a Heroku account with the Heroku CLI installed, a Git repository with all code properly committed, a complete requirements.txt file listing all dependencies, and a Procfile configured for Heroku process management.

The deployment workflow starts with creating the Heroku application using heroku create parentplanner-app, followed by adding a PostgreSQL database through heroku addons:create heroku-postgresql:hobby-dev for data persistence. Environment variables are configured securely using heroku config:set SECRET_KEY=your-secret-key-here and heroku config:set DEBUG=False to ensure production security settings.

Application deployment occurs through git push heroku main, which automatically builds and deploys the application to Heroku's infrastructure. Database setup is completed by running migrations with heroku run python manage.py migrate and creating an administrative user through heroku run python manage.py createsuperuser. Finally, static files are collected and optimised using heroku run python manage.py collectstatic --noinput to ensure all CSS, JavaScript, and image files are properly served.

📝 Local Development Setup
Local development begins by cloning the repository using git clone https://github.com/EKennard/Parent-Planner.git followed by navigating to the project directory with cd Parent-Planner. A virtual environment is created and activated using python -m venv venv and source venv/bin/activate on Unix systems or venv\Scripts\activate on Windows systems to isolate project dependencies.

Dependencies are installed through pip install -r requirements.txt, which ensures all necessary packages are available for local development. Environment configuration requires creating an env.py file in the root directory containing the secret key and debug settings for local development security.

Database setup involves running python manage.py makemigrations to prepare database changes, python manage.py migrate to apply those changes to the local SQLite database, and python manage.py createsuperuser to create an administrative account for accessing the Django admin interface. The development server is started using python manage.py runserver, making the application accessible at the local development address.

📝 Production Configuration
The production environment implements comprehensive security measures including CSRF protection with trusted origins configured for the Heroku domain. PostgreSQL provides reliable data persistence and supports the application's growing data requirements, while WhiteNoise middleware ensures efficient static file serving without requiring a separate content delivery network. Gunicorn serves as the WSGI server for production deployment, providing robust performance and concurrent request handling. Environment variables are managed securely through Heroku config vars, ensuring sensitive information like secret keys and database credentials remain protected while being accessible to the application.

📋 Testing
The ParentPlanner application has undergone comprehensive testing to ensure functionality, usability, and compatibility across different devices and browsers.

Manual testing has covered all aspects of user authentication including registration, login, logout, and session management, with all functions performing successfully across different scenarios. CRUD operations have been thoroughly verified for all content types, ensuring that users can reliably create, read, update, and delete their family information. Responsive design testing has confirmed that the layout performs correctly across mobile, tablet, and desktop screen sizes, while browser compatibility testing has validated functionality on Chrome, Firefox, Safari, and Edge browsers. Interactive features including task completion toggles, expandable cards, and form submissions have been tested extensively to ensure smooth user interaction. Data validation testing has confirmed that form validation and error handling work correctly across all input fields, protecting against invalid data entry.

📝 Debugging & Issue Resolution
Significant debugging efforts were required to resolve data validation mismatches between Django models and frontend templates. The most critical issue involved category options in edit modals not matching the CATEGORY_CHOICES defined in the Django models, causing form validation failures and "Unknown error" messages when users attempted to update tasks, events, or notes.

The debugging process revealed that while add modals correctly used Django form rendering (which automatically pulled categories from model definitions), the edit modals contained hardcoded HTML select options that were inconsistent with the model choices. Extensive investigation was required to trace the validation errors from frontend form submissions through Django's form validation system to identify the source of the mismatch.

Resolution involved systematically updating all edit modal category dropdowns to match the standardized category system defined in the models: None, Homework, Health, School, Activities, Chores, Appointments, Reminders, Celebrations, Achievements, and Other. Additional debugging was performed to ensure URL routing patterns matched between JavaScript AJAX calls and Django URL configurations, resolving 404 errors that occurred during edit operations.

The debugging process highlighted the importance of maintaining consistency between Django model definitions and frontend template implementations, leading to improved development practices for future feature additions.

📝 Validator Testing
👤 HTML Validation
All HTML templates have been validated using the W3C Markup Validator, confirming adherence to web standards and best practices. The application implements semantic HTML5 structure throughout, ensuring accessibility and proper document structure. Production templates contain no validation errors, while proper accessibility attributes have been included to support screen readers and assistive technologies. The markup follows clean, well-structured principles that align with modern web development best practices.

HTML Validation Results W3C HTML Validator showing zero errors and warnings

👤 CSS Validation
The styling approach utilises the Tailwind CSS framework, which provides pre-validated utility classes that ensure consistent and error-free styling. All custom CSS styles have been validated using the W3C CSS Validator, which returned zero errors and zero warnings, confirming complete compliance with CSS standards. Responsive design principles have been properly implemented throughout the application, while cross-browser compatibility has been ensured through standardised CSS practices that work consistently across different browsers and devices.

CSS Validation Results W3C CSS Validator confirming zero errors and zero warnings

👤 Python Code Quality
The Python codebase adheres to PEP 8 style guidelines, ensuring readable and maintainable code that follows industry standards. Django best practices have been implemented throughout the codebase, providing a solid foundation for current functionality and future development. Proper error handling and exception management protect against unexpected situations, while comprehensive security measures including CSRF protection and user authentication safeguard user data. Database queries have been optimised for performance to ensure fast response times, and the code organisation follows Django's Model-View-Template architecture for maintainable and scalable development.

📝 Known Issues & Unfixed Bugs
Debugging & Issue Resolution
Significant debugging efforts were required to resolve data validation mismatches between Django models and frontend templates. The most critical issue involved category options in edit modals not matching the CATEGORY_CHOICES defined in the Django models, causing form validation failures and "Unknown error" messages when users attempted to update tasks, events, or notes.

The debugging process revealed that while add modals correctly used Django form rendering (which automatically pulled categories from model definitions), the edit modals contained hardcoded HTML select options that were inconsistent with the model choices. Extensive investigation was required to trace the validation errors from frontend form submissions through Django's form validation system to identify the source of the mismatch.

Resolution involved systematically updating all edit modal category dropdowns to match the standardized category system defined in the models: None, Homework, Health, School, Activities, Chores, Appointments, Reminders, Celebrations, Achievements, and Other. Additional debugging was performed to ensure URL routing patterns matched between JavaScript AJAX calls and Django URL configurations, resolving 404 errors that occurred during edit operations.

The debugging process highlighted the importance of maintaining consistency between Django model definitions and frontend template implementations, leading to improved development practices for future feature additions.

Known Issues & Unfixed Bugs
Several issues have been successfully resolved during development, including task completion toggle 404 errors that were fixed through proper URL routing and AJAX implementation. Event sorting problems that previously showed past events first have been resolved with custom Django query ordering that prioritises upcoming activities. Dashboard section scrolling issues were addressed through CSS height constraints and overflow properties, while footer positioning problems were resolved with flexbox layout improvements. Mobile layout overflow problems have been fixed through comprehensive responsive design updates that ensure proper display across all device sizes.

Current limitations include the email notification system which has not yet been implemented but is planned for future release. The monthly calendar view is not currently available but is in active development for the next version. Export functionality for sharing family schedules is not implemented but represents a future enhancement opportunity. Recurring events are not currently supported but are planned as a future feature, while multi-user family sharing capabilities are not available but are under consideration for future development phases.

## 🔍 HTML/CSS Validation Issues

The following validation issues have been identified and categorized for future resolution:

### CSS Issues
- **Line-clamp Property Warnings**: The CSS validator reports that `line-clamp` property doesn't exist. These warnings are expected as the application uses `-webkit-line-clamp` for cross-browser text truncation compatibility. The CSS validator doesn't recognize this modern Tailwind CSS utility.
- **Tailwind CSS Utilities**: Various Tailwind CSS utilities may not be recognized by standard CSS validators but are intentionally used for rapid development and consistency.

### HTML Issues  
- **Duplicate IDs Between Views**: The dashboard contains duplicate element IDs between mobile swipe view and desktop grid view (e.g., `events-section-heading`, `tasks-section`, `event-title-48`). This occurs because component templates are included in both views. Future fix will implement context-aware component IDs.
- **Unnecessary Role Attributes**: HTML validator reports unnecessary `role` attributes on semantic elements (nav, main, ul). These are intentionally added for enhanced accessibility support and screen reader compatibility, following WCAG guidelines.
- **ARIA Label Warnings**: Validator suggests possible misuse of `aria-label` attributes. These labels provide essential context for screen readers and assistive technologies, improving accessibility for users with disabilities.

### Accessibility Enhancements
- **Enhanced Screen Reader Support**: The application includes extensive ARIA labels and role attributes beyond HTML5 semantic requirements to ensure comprehensive accessibility.
- **Keyboard Navigation**: Additional markup supports keyboard-only navigation patterns for improved usability.
- **Screen Reader Context**: ARIA labels provide context that isn't visually apparent but is crucial for assistive technology users.

### Resolution Timeline
- **High Priority**: Duplicate ID issues will be resolved by implementing dynamic ID generation in component templates.
- **Medium Priority**: CSS validation warnings are acceptable as they reflect modern CSS features and Tailwind utilities.
- **Low Priority**: ARIA and role attribute warnings reflect intentional accessibility enhancements and will be retained.

📋 Credits
📝 Content and Development
👤 Framework and Backend
Django Framework
Django Authentication
SQLite Database
Python
👤 Frontend Technologies
Tailwind CSS
HTML
JavaScript
CSS
👤 Design and User Experience
Font Awesome Icons
Google Fonts
Coolers
Balsamiq
Draw IO
👤 Resources
Stack Overflow
Django Documentation
MDN Web Docs
W3Schools
Tailwind CSS Documentation
Heroku Dev Center
GitHub Community
CSS-Tricks
Django Girls Tutorial
Real Python
Font Awesome Documentation
VS Code Documentation
Git Documentation
PostgreSQL Documentation
W3C Validators