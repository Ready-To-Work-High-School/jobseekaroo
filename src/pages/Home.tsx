
import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import EnhancedHero from '../components/EnhancedHero';

const Home = () => {
  const { user } = useAuth();
  
  return (
    <Layout>
      <EnhancedHero />
    </Layout>
  );
};

export default Home;
