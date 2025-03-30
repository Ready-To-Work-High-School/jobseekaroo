
const express = require('express');
const router = express.Router();
const { getOne, getAll, runQuery } = require('../db');
const { hashPassword, comparePassword, generateToken, authenticate } = require('../auth');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
    
    // Check if user already exists
    const existingUser = await getOne(
      'SELECT * FROM users WHERE email = ? OR username = ?', 
      [email, username]
    );
    
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with that email or username' });
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user
    const result = await runQuery(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    
    // Generate token
    const token = generateToken(result.lastID);
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: result.lastID,
        username,
        email
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }
    
    // Find user
    const user = await getOne('SELECT * FROM users WHERE email = ?', [email]);
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await comparePassword(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = generateToken(user.id);
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Get current user (protected route)
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await getOne('SELECT id, username, email, created_at FROM users WHERE id = ?', [req.user.id]);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Server error retrieving user data' });
  }
});

// Get all users (admin route example)
router.get('/', authenticate, async (req, res) => {
  try {
    // In a real app, you'd check if the current user is an admin
    const users = await getAll('SELECT id, username, email, created_at FROM users');
    res.json({ users });
  } catch (err) {
    console.error('Get all users error:', err);
    res.status(500).json({ error: 'Server error retrieving users' });
  }
});

module.exports = router;
