
const express = require('express');
const { generateToken, authenticate } = require('../auth.cjs');
const router = express.Router();
const { supabase } = require('../../integrations/supabase/client');
const bcrypt = require('bcryptjs');

// Sanitize inputs to prevent XSS
const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  return input;
};

// Hash password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Compare password
async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

// Register a new user
router.post('/register', async (req, res) => {
  try {
    // Sanitize inputs
    const username = sanitizeInput(req.body.username);
    const email = sanitizeInput(req.body.email);
    const password = req.body.password; // Don't sanitize password, just hash it
    
    // Enhanced validation with better error messages
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    
    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error('Database error:', checkError);
      return res.status(500).json({ error: 'Server error while checking email' });
    }
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    
    try {
      // Hash password
      const hashedPassword = await hashPassword(password);
      
      // Insert user
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([
          { username, email, password: hashedPassword }
        ])
        .select('id, username, email, created_at')
        .single();
      
      if (insertError) {
        console.error('Error creating user:', insertError);
        return res.status(500).json({ error: 'Failed to create user in database' });
      }
      
      // Generate token
      const token = generateToken(newUser.id);
      
      res.status(201).json({
        token,
        user: newUser
      });
    } catch (hashError) {
      console.error('Password hashing error:', hashError);
      return res.status(500).json({ error: 'Error processing your password' });
    }
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const email = sanitizeInput(req.body.email);
    const password = req.body.password; // Don't sanitize password
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }
    
    // Check user
    const { data: user, error: getUserError } = await supabase
      .from('users')
      .select('id, username, email, password, created_at')
      .eq('email', email)
      .single();
    
    if (getUserError) {
      console.error('Database error:', getUserError);
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
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current user
router.get('/me', authenticate, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, email, created_at')
      .eq('id', req.user.id)
      .single();
    
    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Server error' });
    }
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
