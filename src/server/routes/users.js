
const express = require('express');
const { db } = require('../db');
const { hashPassword, comparePassword, generateToken, authenticate } = require('../auth');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Enhanced validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Please provide username, email and password' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    
    // Check if email already exists
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Server error' });
      }
      
      if (user) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      
      // Hash password
      const hashedPassword = await hashPassword(password);
      
      // Insert user
      db.run(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        function(err) {
          if (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ error: 'Failed to create user' });
          }
          
          // Generate token
          const token = generateToken(this.lastID);
          
          // Get the created user
          db.get('SELECT id, username, email FROM users WHERE id = ?', [this.lastID], (err, user) => {
            if (err) {
              console.error('Error fetching created user:', err);
              return res.status(500).json({ error: 'Failed to fetch user details' });
            }
            
            res.status(201).json({
              token,
              user
            });
          });
        }
      );
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }
    
    // Check user
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Server error' });
      }
      
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      
      // Verify password
      const isMatch = await comparePassword(password, user.password);
      
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      
      // Generate token
      const token = generateToken(user.id);
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({
        token,
        user: userWithoutPassword
      });
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current user
router.get('/me', authenticate, (req, res) => {
  db.get('SELECT id, username, email FROM users WHERE id = ?', [req.user.id], (err, user) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user });
  });
});

module.exports = router;
