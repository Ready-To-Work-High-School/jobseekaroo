
const express = require('express');
const router = express.Router();
const { cacheMiddleware } = require('../middleware/cacheMiddleware.js');

// Sample job data - in a real app, this would come from a database
const jobsData = [
  {
    id: 'job-001',
    title: 'Front-end Developer',
    company: {
      name: 'TechCorp'
    },
    location: {
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105'
    },
    type: 'full-time',
    payRate: {
      min: 25,
      max: 45,
      period: 'hourly'
    },
    description: 'We are looking for a skilled front-end developer.',
    requirements: ['JavaScript', 'React', 'CSS'],
    experienceLevel: 'mid-level',
    postedDate: new Date().toISOString(),
    isRemote: true,
    isFlexible: true
  }
];

// Get all jobs with optional filtering
router.get('/', cacheMiddleware(300), (req, res) => {
  // Get query parameters for filtering
  const { 
    zipCode, 
    radius,
    jobType,
    experienceLevel,
    isRemote,
    isFlexible,
    salaryMin,
    salaryMax,
    postedWithin,
    keyword,
    page = 1,
    limit = 10
  } = req.query;

  // For demonstration, just return all jobs
  // In a real app, we would apply filters to a database query

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedJobs = jobsData.slice(startIndex, endIndex);

  res.json({
    jobs: paginatedJobs,
    pagination: {
      total: jobsData.length,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(jobsData.length / limit)
    }
  });
});

// Get job by ID
router.get('/:id', cacheMiddleware(600), (req, res) => {
  const job = jobsData.find(job => job.id === req.params.id);
  
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  
  res.json(job);
});

module.exports = router;
