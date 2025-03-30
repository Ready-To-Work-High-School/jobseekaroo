
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';

import Layout from './components/Layout';
import Index from './pages/Index';
import ServerDemo from './pages/ServerDemo';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <Helmet titleTemplate="%s | Career Platform" defaultTitle="Career Platform">
        <meta name="description" content="Find the perfect entry level job for credential holders" />
      </Helmet>
      
      <AuthProvider>
        <Toaster position="top-right" richColors closeButton />
        
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/server-demo" element={<ServerDemo />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
