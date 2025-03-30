
const express = require('express');
const router = express.Router();
const { getOne, getAll, runQuery } = require('../db');
const { authenticate } = require('../auth');

// Create a new post (protected)
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Please provide title and content' });
    }
    
    const result = await runQuery(
      'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
      [req.user.id, title, content]
    );
    
    const post = await getOne('SELECT * FROM posts WHERE id = ?', [result.lastID]);
    
    res.status(201).json({ 
      message: 'Post created successfully', 
      post 
    });
  } catch (err) {
    console.error('Create post error:', err);
    res.status(500).json({ error: 'Server error creating post' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await getAll(`
      SELECT p.*, u.username 
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `);
    
    res.json({ posts });
  } catch (err) {
    console.error('Get posts error:', err);
    res.status(500).json({ error: 'Server error retrieving posts' });
  }
});

// Get post by id
router.get('/:id', async (req, res) => {
  try {
    const post = await getOne(`
      SELECT p.*, u.username 
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `, [req.params.id]);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({ post });
  } catch (err) {
    console.error('Get post error:', err);
    res.status(500).json({ error: 'Server error retrieving post' });
  }
});

// Update post (protected)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title && !content) {
      return res.status(400).json({ error: 'Please provide title or content to update' });
    }
    
    // Check if post exists and belongs to user
    const post = await getOne(
      'SELECT * FROM posts WHERE id = ?', 
      [req.params.id]
    );
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    if (post.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this post' });
    }
    
    // Update post
    const updates = [];
    const values = [];
    
    if (title) {
      updates.push('title = ?');
      values.push(title);
    }
    
    if (content) {
      updates.push('content = ?');
      values.push(content);
    }
    
    // Add id at the end for the WHERE clause
    values.push(req.params.id);
    
    await runQuery(
      `UPDATE posts SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    
    const updatedPost = await getOne('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    
    res.json({ 
      message: 'Post updated successfully', 
      post: updatedPost 
    });
  } catch (err) {
    console.error('Update post error:', err);
    res.status(500).json({ error: 'Server error updating post' });
  }
});

// Delete post (protected)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    // Check if post exists and belongs to user
    const post = await getOne(
      'SELECT * FROM posts WHERE id = ?', 
      [req.params.id]
    );
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    if (post.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }
    
    // Delete post
    await runQuery('DELETE FROM posts WHERE id = ?', [req.params.id]);
    
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Delete post error:', err);
    res.status(500).json({ error: 'Server error deleting post' });
  }
});

module.exports = router;
