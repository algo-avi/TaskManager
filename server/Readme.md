# Task Tracker Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for tracking tasks and projects.

## Features

- User authentication (signup, login) with JWT
- Project management (create up to 4 projects per user)
- Task management (create, read, update, delete tasks)
- Task status tracking (todo, in progress, completed)
- Responsive UI with Tailwind CSS

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API requests
- React Toastify for notifications
- Tailwind CSS for styling

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing


## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/task-tracker.git
   cd task-tracker
   \`\`\`

2. Install backend dependencies:
   \`\`\`bash
   cd server
   npm install
   \`\`\`

3. Set up environment variables:
   - Copy `.env.example` to `.env` and update with your MongoDB URI and JWT secret

4. Install frontend dependencies:
   \`\`\`bash
   cd ../client
   npm install
   \`\`\`

5. Create a `.env` file in the client directory:
   \`\`\`
   REACT_APP_API_URL=http://localhost:5000/api
   \`\`\`

### Running the Application

1. Start the backend server:
   \`\`\`bash
   cd server
   npm run dev
   \`\`\`

2. Start the frontend development server:
   \`\`\`bash
   cd client
   npm start
   \`\`\`

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Projects
- `GET /api/projects` - Get all projects for the authenticated user
- `GET /api/projects/:id` - Get a specific project with its tasks
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Tasks
- `POST /api/projects/:id/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Deployment

### Backend
The Express.js backend can be deployed to services like:
- Heroku
- Railway
- Render
- Digital Ocean

### Frontend
The React.js frontend can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## Future Enhancements

- Task priorities
- Due dates for tasks
- Team collaboration features
- File attachments for tasks
- Email notifications

## License

This project is licensed under the MIT License.
