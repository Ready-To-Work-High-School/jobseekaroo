
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';

import Layout from './components/Layout';
import Index from './pages/Index';
import ServerDemo from './pages/ServerDemo';

function App() {
  return (
    <Router>
      <Helmet titleTemplate="%s | Career Platform" defaultTitle="Career Platform">
        <meta name="description" content="Find the perfect entry level job for credential holders" />
      </Helmet>
      
      <Toaster position="top-right" richColors closeButton />
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/server-demo" element={<ServerDemo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
