
import React from 'react';
import { useParams } from 'react-router-dom';
import JobDetailsPage from './JobDetailsPage';

// This is a compatibility component to handle the /jobs/:id route
const JobDetail = () => {
  return <JobDetailsPage />;
};

export default JobDetail;
