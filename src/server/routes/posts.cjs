
const express = require('express');
const { db } = require('../db');
const { authenticate } = require('../auth');

const router = express.Router();

// Get all posts
router.get('/', (req, res) => {
  db.all(`
    SELECT p.id, p.title, p.content, p.created_at, u.username
    FROM posts p
    JOIN users u ON p.user_id = u.id
    ORDER BY p.created_at DESC
  `, (err, posts) => {
    if (err) {
      console.error('Error fetching posts:', err);
      return res.status(500).json({ error: 'Failed to fetch posts' });
    }
    
    res.json({ posts });
  });
});

// Get a single post
router.get('/:id', (req, res) => {
  const postId = req.params.id;
  
  db.get(`
    SELECT p.id, p.title, p.content, p.created_at, u.username
    FROM posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.id = ?
  `, [postId], (err, post) => {
    if (err) {
      console.error('Error fetching post:', err);
      return res.status(500).json({ error: 'Failed to fetch post' });
    }
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({ post });
  });
});

// Create a post (requires authentication)
router.post('/', authenticate, (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  
  // Basic validation
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  // Insert post
  db.run(
    'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',
    [title, content, userId],
    function(err) {
      if (err) {
        console.error('Error creating post:', err);
        return res.status(500).json({ error: 'Failed to create post' });
      }
      
      // Get the created post with username
      db.get(`
        SELECT p.id, p.title, p.content, p.created_at, u.username
        FROM posts p
        JOIN users u ON p.user_id = u.id
        WHERE p.id = ?
      `, [this.lastID], (err, post) => {
        if (err) {
          console.error('Error fetching created post:', err);
          return res.status(500).json({ error: 'Failed to fetch post details' });
        }
        
        res.status(201).json({ post });
      });
    }
  );
});

// Update a post (requires authentication and ownership)
router.put('/:id', authenticate, (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const { title, content } = req.body;
  
  // Basic validation
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  // Check if post exists and belongs to user
  db.get('SELECT * FROM posts WHERE id = ?', [postId], (err, post) => {
    if (err) {
      console.error('Error fetching post:', err);
      return res.status(500).json({ error: 'Failed to fetch post' });
    }
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    if (post.user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized to update this post' });
    }
    
    // Update post
    db.run(
      'UPDATE posts SET title = ?, content = ? WHERE id = ?',
      [title, content, postId],
      function(err) {
        if (err) {
          console.error('Error updating post:', err);
          return res.status(500).json({ error: 'Failed to update post' });
        }
        
        // Get the updated post with username
        db.get(`
          SELECT p.id, p.title, p.content, p.created_at, u.username
          FROM posts p
          JOIN users u ON p.user_id = u.id
          WHERE p.id = ?
        `, [postId], (err, post) => {
          if (err) {
            console.error('Error fetching updated post:', err);
            return res.status(500).json({ error: 'Failed to fetch post details' });
          }
          
          res.json({ post });
        });
      }
    );
  });
});

// Delete a post (requires authentication and ownership)
router.delete('/:id', authenticate, (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  
  // Check if post exists and belongs to user
  db.get('SELECT * FROM posts WHERE id = ?', [postId], (err, post) => {
    if (err) {
      console.error('Error fetching post:', err);
      return res.status(500).json({ error: 'Failed to fetch post' });
    }
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    if (post.user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized to delete this post' });
    }
    
    // Delete post
    db.run('DELETE FROM posts WHERE id = ?', [postId], function(err) {
      if (err) {
        console.error('Error deleting post:', err);
        return res.status(500).json({ error: 'Failed to delete post' });
      }
      
      res.json({ message: 'Post deleted successfully' });
    });
  });
});

module.exports = router;
