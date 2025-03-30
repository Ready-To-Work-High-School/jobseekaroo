
import { Helmet } from "react-helmet";
import ServerDataDisplay from "@/components/ServerDataDisplay";

const ServerDemo = () => {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <Helmet>
        <title>Server Demo | API Integration</title>
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-6">Server API Integration Demo</h1>
      <p className="text-gray-600 mb-8">
        This page demonstrates the integration between the React frontend and Express backend.
        Make sure your server is running with <code>npm run server</code> to see the data.
      </p>
      
      <ServerDataDisplay />
      
      <div className="mt-10 p-6 bg-gray-50 rounded-lg border">
        <h2 className="text-xl font-medium mb-4">How It Works</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>The frontend sends a request to <code>/api/secure-data</code></li>
          <li>Vite's proxy forwards this to your Express server at <code>http://localhost:5000</code></li>
          <li>The Express server processes the request and returns the data</li>
          <li>The React component displays the returned information</li>
        </ul>
      </div>
    </div>
  );
};

export default ServerDemo;
