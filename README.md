## RBAC Management System ##

The RBAC (Role-Based Access Control) Management System is a React-based application that allows administrators to manage users and roles efficiently. This system supports adding, editing, and deleting users and roles while ensuring a user-friendly and responsive design.

** Features **
# User Management #
=> Add new users with a name and a specific role.
=> Edit existing user details.
=> Delete users from the system.
=> Role-based dropdown for user assignment.

# Role Management #
=> Create new roles with customizable permissions (e.g., Read, Write, Delete).
=> Edit existing roles and their permissions.
=> Delete roles safely.

# Responsive Design #
=> Fully responsive UI adapts to all screen sizes (mobile, tablet, desktop).
=> Easy-to-navigate tabs for switching between user and role management.


## Technologies Used ##
React.js: Component-based UI rendering.
CSS: For styling and responsiveness.
LocalStorage: To persist user and role data.
Font Family: Roboto.


rbac-management-system/
│
├── public/                  
├── src/
│   ├── components/
│   │   ├── UserManagement.js    # User management logic and UI
│   │   ├── RoleManagement.js    # Role management logic and UI
│   │
│   ├── App.js                 # Main application entry point
│   ├── App.css                # Application styling
│   ├── index.js               # ReactDOM rendering
│
├── README.md                 # Documentation
├── package.json              # Dependencies and scripts
