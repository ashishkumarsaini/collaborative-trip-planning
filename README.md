# Collaborative Trip Planning

A collaborative trip planning system where users can create, manage, and plan trips seamlessly. This hobby project allows individuals and groups to organize trips with features for authentication, trip management, permissions, and activity planning.

## Features

### Authentication (Auth)

- User registration and login
- JWT-based authentication
- Secure password hashing with bcrypt

### Trips

- **Create**: Users can create new trips
- **Read**: View trip details and lists
- **Update**: Modify existing trip information
- **Delete**: Remove trips

### Trip Permissions

- **Create**: Assign permissions to other users for trip access
- **Read**: View who has access to a trip
- **Update**: Modify permissions for collaborators
- **Delete**: Remove permissions

### Activities for Trips

- **CRUD Operations**: Create, read, update, and delete activities
- **Location**: Associate activities with specific locations
- **Start Date**: Set start dates for activities
- **Number of Days**: Define duration for each activity

### People Joined the Trips

- Manage collaborators and participants
- Permission-based access control

## Tech Stack

### Backend

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database (via Mongoose)
- **JWT**: Authentication tokens
- **bcrypt**: Password hashing
- **Express Validator**: Input validation
- **CORS**: Cross-origin resource sharing

### Frontend

- **Next.js**: React framework
- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: UI component library
- **React Hook Form**: Form handling
- **Zod**: Schema validation
- **Radix UI**: Accessible UI primitives

### Deployment

- **Vercel**: Hosting platform for both frontend and backend

## Project Structure

```
collaborative-trip-planning/
├── backend/                          # Backend application
│   ├── src/
│   │   ├── controllers/              # Route handlers for activities, auth, locations, trips
│   │   ├── database/                 # Database connection setup
│   │   ├── libs/                     # Utility libraries (bcrypt, JWT, secrets)
│   │   ├── middlewares/              # Authentication, validation, and other middlewares
│   │   ├── models/                   # Mongoose models for activities, locations, trips, users
│   │   ├── routes/                   # API route definitions
│   │   ├── utils/                    # Helper functions and API utilities
│   │   └── validators/               # Input validation schemas
│   ├── index.js                      # Main server entry point
│   ├── package.json                  # Backend dependencies
│   └── vercel.json                   # Vercel deployment config
├── frontend/                         # Frontend application
│   ├── app/                          # Next.js app directory
│   │   ├── api/                      # API routes
│   │   ├── components/               # Reusable UI components
│   │   │   ├── app-drawers/          # Drawer components for forms
│   │   │   ├── form/                 # Form components (activity, login signup, trip)
│   │   │   ├── ui/                   # shadcn/ui components
│   │   │   └── ...                   # Other UI components
│   │   ├── login/                    # Login page
│   │   ├── profile/                  # User profile page
│   │   ├── signup/                   # Signup page
│   │   └── trip/                     # Trip-related pages
│   ├── lib/                          # Utility libraries
│   │   ├── api/                      # API client functions
│   │   ├── context/                  # React context providers
│   │   ├── services/                 # Service layer functions
│   │   ├── types/                    # TypeScript type definitions
│   │   └── validators/               # Zod validation schemas
│   ├── mocks/                        # Mock data for development
│   ├── public/                       # Static assets
│   ├── package.json                  # Frontend dependencies
│   └── vercel.json                   # Vercel deployment config
└── README.md                         # Project documentation
```

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB database

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with necessary environment variables (e.g., database URL, JWT secret). Use `.env.example` for reference

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Register a new account or log in with existing credentials.
2. Create a new trip from the dashboard.
3. Add activities to your trip with locations, dates, and durations.
4. Invite collaborators and manage permissions.
5. View and update trip details as needed.

## Live Demo

[wanderscape.in](https://www.wanderscape.in/)

## Repository

[GitHub Repository](https://github.com/ashishkumarsaini/collaborative-trip-planning)
