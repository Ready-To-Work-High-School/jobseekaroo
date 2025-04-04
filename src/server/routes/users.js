
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Users API endpoint',
    endpoints: ['/api/users', '/api/users/:id']
  });
});

router.get('/:id', (req, res) => {
  res.json({
    message: `User with id ${req.params.id}`,
    id: req.params.id
  });
});

module.exports = router;
