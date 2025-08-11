# ParentPlanner

![ParentPlanner Header Screenshot](assets/images/header-screenshot.png)

ParentPlanner is a web application designed to help modern families stay organised and manage their daily activities effectively. The app will enable parents to create personalised profiles for each child, track important tasks and events, and maintain clear oversight of family schedules. Family Planner is targeted toward busy parents who need a centralised system to coordinate multiple children's activities, school events, appointments, and personal notes. The application provides a list view, making it easy for families to visualise their schedules and ensure nothing important is missed.

## User Stories

The ParentPlanner App was developed with specific user needs in mind, addressing real-world challenges faced by modern families in managing their daily activities and long-term planning.

### Must Haves

- **Registration & Setup**: "As a user, I want to quickly create an account and set up my family profile so that I can start organising our activities immediately without complex setup procedures."
- **Child Profile Management**: "As a user, I want to create individual profiles for each child with their school information and personal details so that I can track activities and school-specific events."
- **Quick Entry Creation**: "As a user, I want to quickly add notes, tasks, and events for my children from a single form so that I don't have to navigate through multiple screens to capture important information."
- **Family Overview Dashboard**: "As a user, I want to see all my children's activities in one centralised dashboard so that I can quickly assess our family's schedule and identify potential conflicts or busy periods."
- **Category Organization**: "As a user, I want to categorize entries (School, Sports, Health, Entertainment) so that I can quickly filter and focus on specific areas of my children's lives."
- **Due Date Tracking**: "As a user, I want to see which tasks are approaching their due dates with clear visual indicators so that I can prioritise and ensure nothing is forgotten."
- **Child-Specific Views**: "As a user, I want to filter and view activities for individual children so that I can focus on one child's events."
- **Entry Management**: "As a user, I want to easily edit and modify existing entries so that I can keep our family information current as situations change."
- **Attractive and ledgible design**: "As a user, I want the app to have a simple yet colourfull design, with clear fonts so that I can easily read the information and it looks attractive."
- **Mobile first design**: "As a user, I want the app to be mobile first so that I can access the app on the go."
- **Navigation**: "As a user, I want to be able to easily navigate the app so that i can quickly and efficiently view and input information."

### Should Haves
- **Event time management**: "As a user, I want to see start and end times clearly so that I can avoid double-booking."
- **Family Sharing**: "As a user,I want to share selected event information so that both parents stay informed."
- **Export capabilities**: "As a user, I want to export relevant schedule information so that I can share appropriate details with teachers, babysitters, and family members who need to know our availability/child schedule."
**Colour coded activity types**: "As a user, I want to see notes, tasks, and events displayed in different colours so that I can quickly identify the type of activity without reading details."

### Could Haves
- **Location Awareness**: "As a user: I want to see event locations so that I can plan efficient routes and account for travel time. "
- **Monthly calender view**: "As a user I want to see all family activities displayed on a monthly calendar so that I can quickly identify busy periods and plan accordingly."
- **Individual child calendersa**: "As a user I want to view individual calendar pages for each child so that I can focus on one child's commitments when discussing their schedule."
- **Easy calenders date entries**: "As a user I want to click on any calendar date and immediately create an entry for that specific day so that I can plan ahead efficiently while viewing our schedule."
- **Quick celender navigation**: "As a user I want  to easily navigate between different months and years so that I can schedule future events and review past activities."

## Features
### Existing Features
#### **Authentication**

![Login Screen Screenshot](assets/images/login-screenshot.png)

The application features a comprehensive email-based user registration and login system that provides secure password authentication using Django's built-in security features. Users benefit from automatic session management with login persistence, ensuring a seamless experience across browsing sessions. The secure logout functionality properly terminates user sessions, while user account isolation guarantees that family data remains private and separated between different user accounts.

![Registration Screen Screenshot](assets/images/registration-screenshot.png)

#### **Navigation**

![Navigation Bar Screenshot](assets/images/navigation-screenshot.png)

The navigation system includes a responsive navigation bar that seamlessly adapts between mobile and desktop screen sizes. Users are welcomed with a personalised message displaying their logged-in username, alongside quick access links to the Dashboard and Logout functionality. Mobile users enjoy an optimised hamburger menu designed specifically for smaller screens, all supported by a clean and intuitive navigation structure that makes moving through the application effortless.

![Mobile Navigation Screenshot](assets/images/mobile-navigation-screenshot.png)

#### **Dashboard**

![Dashboard Overview Screenshot](assets/images/dashboard-overview-screenshot.png)

The dashboard presents a centralised four-section layout that displays Children, Events, Tasks, and Notes in an organised manner. Real-time content updates occur without requiring page refreshes, while the responsive grid system adapts from a mobile stack layout to a desktop four-column arrangement. Each section features colour coding for easy visual identification, with individual section scrolling capabilities when content exceeds the viewport height. Interactive task completion provides visual feedback, while chronological event sorting ensures upcoming activities appear first. The dashboard is completed with a professional footer containing copyright and branding information.

![Dashboard Mobile View Screenshot](assets/images/dashboard-mobile-screenshot.png)

#### **Child Management**

![Child Profile Screenshot](assets/images/child-profile-screenshot.png)

Parents can create individual child profiles that include personalised information and unique colour assignments for easy visual identification throughout the application. The system allows for detailed school information recording, including school names and year groups, with the flexibility to edit and update child profiles as information changes over time. Child-specific activity filtering and viewing capabilities enable focused management, while visual child cards display essential information including initials, names, school details, and year information in an accessible format.

![Add Child Form Screenshot](assets/images/add-child-form-screenshot.png)

#### **Entry System**

![Add Entry Form Screenshot](assets/images/add-entry-form-screenshot.png)

The application supports three distinct entry types: Events, Tasks, and Notes, each designed for specific family management needs. A smart categorisation system organises activities into School, Sports, Health, and Entertainment categories for efficient organisation. Event management includes separate start and end time tracking, while task management incorporates due dates and priority levels ranging from High to Low importance. Note-taking functionality provides a space for general family information and reminders, and descriptions across all entry types.

![Entry Types Screenshot](assets/images/entry-types-screenshot.png)

#### **Entry Management**

![Entry Management Screenshot](assets/images/entry-management-screenshot.png)

Complete CRUD operations are available for all entry types, ensuring full data management capabilities. Users can edit existing entries using pre-populated forms that maintain data integrity, while unwanted entries can be deleted with appropriate confirmation prompts. Task completion features include a toggle system with immediate visual feedback, automatic reordering of completed tasks for better organization, and child-specific entry filtering that enables focused management of individual children's activities.

![Task Completion Screenshot](assets/images/task-completion-screenshot.png)

#### **Responsive Design**

![Responsive Design Screenshot](assets/images/responsive-design-screenshot.png)

The application employs a mobile-first design approach that has been specifically optimized for smartphone usage while scaling beautifully to larger devices. Tablet users enjoy a touch-optimized interface that takes advantage of the larger screen real estate, while desktop users benefit from an enhanced four-column grid layout that maximizes productivity. The flexible layout system adapts seamlessly to any screen size, ensuring a consistent user experience across all devices with touch-friendly buttons and interactive elements that work equally well with finger taps or mouse clicks.
### Future Features
#### **Calendar View**
The calendar view functionality has not yet been implemented, but is still intended to be a part of the project, with plans for a comprehensive monthly calendar view that will display activities visually. Individual child calendar pages are planned to provide focused scheduling capabilities, allowing parents to manage each child's commitments separately while maintaining an overview of the entire family schedule.

#### **Enhanced Child Profiles**
Future development will expand child profiles to include comprehensive personal information such as photos and detailed personal characteristics. The system will incorporate medical information tracking capabilities for allergies, medications, and emergency contact details to ensure child safety and proper care coordination. Academic progress monitoring features will track grades and teacher information, while activity history and achievement tracking will provide parents with a complete picture of their child's development. Additional features will include growth charts and milestone recording capabilities, with planned integration to school systems for automatic updates that keep information current without manual data entry.

#### **Notification & Reminder System**
A comprehensive notification system will provide email reminders for upcoming events and task due dates, ensuring families never miss important commitments. Browser push notifications will alert users to time-sensitive activities, with customizable reminder timing options including 15-minute, 1-hour, and 1-day advance warnings. SMS notifications will be available for critical events and emergencies, while family member notification sharing will keep all relevant parties informed. The system will feature smart reminder frequency algorithms that adjust notification timing based on event importance and user preferences.

#### **Email Integration & Parsing Module**
Advanced email integration will automatically import events from school email notifications, eliminating manual data entry for routine school communications. Calendar invitation parsing will seamlessly integrate external events into the family schedule, while an email forwarding system will facilitate family coordination. Teacher communication tracking and organization features will maintain a record of important school correspondence, with automated parsing of school newsletters and important dates. The system will integrate with popular email providers including Gmail and Outlook to ensure broad compatibility across different email platforms.
## Testing

![Testing Results Screenshot](assets/images/testing-results-screenshot.png)

The ParentPlanner application has undergone comprehensive testing to ensure functionality, usability, and compatibility across different devices and browsers.

Manual testing has covered all aspects of user authentication including registration, login, logout, and session management, with all functions performing successfully across different scenarios. CRUD operations have been thoroughly verified for all content types, ensuring that users can reliably create, read, update, and delete their family information. Responsive design testing has confirmed that the layout performs correctly across mobile, tablet, and desktop screen sizes, while browser compatibility testing has validated functionality on Chrome, Firefox, Safari, and Edge browsers. Interactive features including task completion toggles, expandable cards, and form submissions have been tested extensively to ensure smooth user interaction. Data validation testing has confirmed that form validation and error handling work correctly across all input fields, protecting against invalid data entry.

![Browser Compatibility Screenshot](assets/images/browser-compatibility-screenshot.png)

### Validator Testing
#### **HTML Validation**

![HTML Validation Screenshot](assets/images/html-validation-screenshot.png)

All HTML templates have been validated using the W3C Markup Validator, confirming adherence to web standards and best practices. The application implements semantic HTML5 structure throughout, ensuring accessibility and proper document structure. Production templates contain no validation errors, while proper accessibility attributes have been included to support screen readers and assistive technologies. The markup follows clean, well-structured principles that align with modern web development best practices.

#### **CSS Validation**

![CSS Validation Screenshot](assets/images/css-validation-screenshot.png)

The styling approach utilizes the Tailwind CSS framework, which provides pre-validated utility classes that ensure consistent and error-free styling. Custom CSS styles have been validated using the W3C CSS Validator, confirming no errors or warnings exist in the production code. Responsive design principles have been properly implemented throughout the application, while cross-browser compatibility has been ensured through standardized CSS practices that work consistently across different browsers and devices.

#### **Python Code Quality**

![Python Code Quality Screenshot](assets/images/python-quality-screenshot.png)

The Python codebase adheres to PEP 8 style guidelines, ensuring readable and maintainable code that follows industry standards. Django best practices have been implemented throughout the codebase, providing a solid foundation for current functionality and future development. Proper error handling and exception management protect against unexpected situations, while comprehensive security measures including CSRF protection and user authentication safeguard user data. Database queries have been optimized for performance to ensure fast response times, and the code organization follows Django's Model-View-Template architecture for maintainable and scalable development.

### Known Issues & Unfixed Bugs

Several issues have been successfully resolved during development, including task completion toggle 404 errors that were fixed through proper URL routing and AJAX implementation. Event sorting problems that previously showed past events first have been resolved with custom Django query ordering that prioritises upcoming activities. Dashboard section scrolling issues were addressed through CSS height constraints and overflow properties, while footer positioning problems were resolved with flexbox layout improvements. Mobile layout overflow problems have been fixed through comprehensive responsive design updates that ensure proper display across all device sizes.

Current limitations include the email notification system which has not yet been implemented but is planned for future release. The monthly calendar view is not currently available but is in active development for the next version. Export functionality for sharing family schedules is not implemented but represents a future enhancement opportunity. Recurring events are not currently supported but are planned as a future feature, while multi-user family sharing capabilities are not available but are under consideration for future development phases.
## Deployment

![Live Application Screenshot](assets/images/live-app-screenshot.png)

### Live Application
The ParentPlanner application is deployed and accessible at https://parentplanner-0a7a2e9a2998.herokuapp.com/ using the Heroku Cloud Platform for reliable hosting and scalability. The production environment utilizes PostgreSQL through Heroku Postgres for robust data management, while WhiteNoise middleware provides efficient static file serving that ensures fast loading times for CSS, JavaScript, and image assets.

![Heroku Dashboard Screenshot](assets/images/heroku-dashboard-screenshot.png)

### Heroku Deployment Process

The deployment process begins with ensuring all prerequisites are met, including having a Heroku account with the Heroku CLI installed, a Git repository with all code properly committed, a complete requirements.txt file listing all dependencies, and a Procfile configured for Heroku process management.

The deployment workflow starts with creating the Heroku application using `heroku create parentplanner-app`, followed by adding a PostgreSQL database through `heroku addons:create heroku-postgresql:hobby-dev` for data persistence. Environment variables are configured securely using `heroku config:set SECRET_KEY=your-secret-key-here` and `heroku config:set DEBUG=False` to ensure production security settings.

Application deployment occurs through `git push heroku main`, which automatically builds and deploys the application to Heroku's infrastructure. Database setup is completed by running migrations with `heroku run python manage.py migrate` and creating an administrative user through `heroku run python manage.py createsuperuser`. Finally, static files are collected and optimized using `heroku run python manage.py collectstatic --noinput` to ensure all CSS, JavaScript, and image files are properly served.

### Local Development Setup

![Local Development Screenshot](assets/images/local-development-screenshot.png)

Local development begins by cloning the repository using `git clone https://github.com/EKennard/Parent-Planner.git` followed by navigating to the project directory with `cd Parent-Planner`. A virtual environment is created and activated using `python -m venv venv` and `source venv/bin/activate` on Unix systems or `venv\Scripts\activate` on Windows systems to isolate project dependencies.

Dependencies are installed through `pip install -r requirements.txt`, which ensures all necessary packages are available for local development. Environment configuration requires creating an `env.py` file in the root directory containing the secret key and debug settings for local development security.

Database setup involves running `python manage.py makemigrations` to prepare database changes, `python manage.py migrate` to apply those changes to the local SQLite database, and `python manage.py createsuperuser` to create an administrative account for accessing the Django admin interface. The development server is started using `python manage.py runserver`, making the application accessible at the local development address.

### Production Configuration
The production environment implements comprehensive security measures including CSRF protection with trusted origins configured for the Heroku domain. PostgreSQL provides reliable data persistence and supports the application's growing data requirements, while WhiteNoise middleware ensures efficient static file serving without requiring a separate content delivery network. Gunicorn serves as the WSGI server for production deployment, providing robust performance and concurrent request handling. Environment variables are managed securely through Heroku config vars, ensuring sensitive information like secret keys and database credentials remain protected while being accessible to the application.
## Credits
### Content and Development
#### **Framework and Backend**
- **Django Framework**
- **Django Authentication**
- **PostgreSQL Database** (Production)
- **SQLite Database** (Development)
- **Python**
#### **Frontend Technologies**
- **Tailwind CSS**
- **HTML**
- **JavaScript**
- **CSS**
#### **Design and User Experience**
- **Font Awesome Icons**
- **Google Fonts**
- **Colours**
