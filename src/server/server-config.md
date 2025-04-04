# Server Configuration

To run the server, add the following script to your package.json:

```json
"scripts": {
  // ... other scripts
  "server": "node src/server/start-server.js"
}
```

Then you can start the server with:

```bash
npm run server
```

## Testing the Server

Once running, you can test the server by accessing:
- http://localhost:5000/api/status - Basic status endpoint
- http://localhost:5000/api/secure-data - Protected data endpoint

## Connecting Frontend to Backend

For development, add a proxy in your vite.config.ts file:

```javascript
export default defineConfig({
  // ... other config
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
});
```

This will forward any requests from your frontend to the backend server.
