# Full Stack Application

This repository contains a full stack application with a React frontend (built with Vite) and an Express.js backend with MongoDB.

## Project Structure

```
project-root/
│
├── frontend/    # React application built with Vite
│
└── backend/     # Express.js server with MongoDB
```

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/myapp
   ```

4. Start the server:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

5. The backend server should now be running at `http://localhost:5000`

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following variables:
   ```
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The frontend development server should now be running at `http://localhost:5173`

6. To build for production:
   ```bash
   npm run build
   ```

## Running Both Applications Simultaneously

You can run both applications in separate terminal windows by following the setup instructions above.

Alternatively, you can use a tool like [concurrently](https://www.npmjs.com/package/concurrently) to run both applications with a single command:

1. Install concurrently in the project root:
   ```bash
   npm install --save-dev concurrently
   ```

2. Add a script to your root package.json:
   ```json
   {
     "scripts": {
       "dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm run dev\""
     }
   }
   ```

3. Run both applications:
   ```bash
   npm run dev
   ```

## Accessing the Application

- Frontend: Open your browser and go to `http://localhost:5173`
- Backend API: Available at `http://localhost:5000`