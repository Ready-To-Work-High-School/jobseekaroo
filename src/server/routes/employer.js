
const express = require('express');
const router = express.Router();
const { supabaseAdmin } = require('../services/supabase');
const { requireAuth, requireEmployerRole } = require('../middleware/auth');

// Middleware to check if the user is an employer
router.use(requireAuth);
router.use(requireEmployerRole);

// GET /api/employer/stats - Get employer statistics
router.get('/stats', async (req, res) => {
  try {
    const { user_id } = req.user;
    const { job_id, start_date, end_date, status } = req.query;

    // Build the query with filters
    let query = supabaseAdmin
      .from('job_applications')
      .select('status, count(*)', { count: 'exact' });
    
    // Add filters
    if (job_id) {
      query = query.eq('job_id', job_id);
    }
    
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }
    
    if (start_date) {
      query = query.gte('applied_date', start_date);
    }
    
    if (end_date) {
      query = query.lte('applied_date', end_date);
    }
    
    // Group by status
    query = query.groupBy('status');
    
    const { data: statusCounts, error: statusError } = await query;
    
    if (statusError) {
      console.error('Error fetching application status counts:', statusError);
      return res.status(500).json({ error: 'Error fetching application statistics' });
    }
    
    // Get total applications count
    const { count, error: countError } = await supabaseAdmin
      .from('job_applications')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error fetching total application count:', countError);
      return res.status(500).json({ error: 'Error fetching application statistics' });
    }
    
    // Format response data
    const formattedStatusCounts = statusCounts.map(item => ({
      status: item.status,
      count: parseInt(item.count)
    }));
    
    res.json({
      total: count,
      statusCounts: formattedStatusCounts
    });
  } catch (error) {
    console.error('Exception in /api/employer/stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/employer/timeline - Get application timeline data
router.get('/timeline', async (req, res) => {
  try {
    const { user_id } = req.user;
    const { job_id, start_date, end_date } = req.query;
    
    // This would be a more complex query using date_trunc in PostgreSQL
    // For this implementation, we'll return mock data
    const timelineData = [
      { month: 'Jan', applications: 18, interviews: 5, offers: 2 },
      { month: 'Feb', applications: 22, interviews: 7, offers: 3 },
      { month: 'Mar', applications: 28, interviews: 10, offers: 5 },
      { month: 'Apr', applications: 32, interviews: 12, offers: 4 },
      { month: 'May', applications: 37, interviews: 15, offers: 7 },
      { month: 'Jun', applications: 42, interviews: 18, offers: 8 }
    ];
    
    res.json(timelineData);
  } catch (error) {
    console.error('Exception in /api/employer/timeline:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
