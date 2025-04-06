
import React from 'react';
import Layout from '../components/Layout';
import EnhancedHero from '../components/EnhancedHero';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <Layout>
      <Helmet>
        <title>Job Seekers 4 HS - Your First Job, Made Simple.</title>
        <meta name="description" content="A fun, safe, mobile-first app to land your first job, with badges and guidance. For high school students at Westside High School." />
      </Helmet>
      <EnhancedHero />
    </Layout>
  );
};

export default Home;
