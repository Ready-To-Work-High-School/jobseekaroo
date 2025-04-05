
import { Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Index from '@/pages/Index';

const HomeRoutes = (
  <>
    <Route path="/" element={<Index />} />
    <Route path="/home" element={<Home />} />
  </>
);

export default HomeRoutes;
