
# Express.js Server

This directory contains the Express.js server implementation for the application.

## Security Features

The server implements several security best practices:

- Disables X-Powered-By header to prevent information disclosure
- Sets security headers (Content-Security-Policy, X-Frame-Options)
- Implements JSON body parsing with safeguards
- Includes centralized error handling

## Running the Server

```
node app.js
```

## API Endpoints

- `GET /api/status` - Check server status
- `GET /api/secure-data` - Get secure framework information

## Integration with Frontend

To connect this Express backend with the React frontend, you'll need to:

1. Set up a proxy in your React development server
2. Make API calls from React components to these endpoints

In a production environment, both the frontend and backend would be built and served together.
