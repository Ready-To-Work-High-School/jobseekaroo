
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Posts API endpoint',
    endpoints: ['/api/posts', '/api/posts/:id']
  });
});

router.get('/:id', (req, res) => {
  res.json({
    message: `Post with id ${req.params.id}`,
    id: req.params.id
  });
});

module.exports = router;
