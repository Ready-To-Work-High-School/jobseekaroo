
# Development Guide

## Starting the Application

You can now start both the frontend and backend servers with a single command:

```bash
node start-dev.js
```

This will concurrently run:
- The Express backend server on port 5000
- The Vite development server on port 8080

You can access your application at http://localhost:8080

## API Endpoints

- Status: http://localhost:5000/api/status
- Users: http://localhost:5000/api/users
- Posts: http://localhost:5000/api/posts
- Contact: http://localhost:5000/api/contact
- Secure Data: http://localhost:5000/api/secure-data

## Stopping the Application

Press `Ctrl+C` in the terminal to stop both servers.
