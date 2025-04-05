
const express = require('express');
const router = express.Router();
const { authenticate } = require('../auth.cjs');
const { supabase } = require('../../integrations/supabase/client');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        id, 
        title, 
        content, 
        created_at, 
        user_id,
        users:user_id (username)
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching posts:', error);
      return res.status(500).json({ error: 'Failed to fetch posts' });
    }
    
    // Format the posts to match the expected structure
    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      created_at: post.created_at,
      username: post.users.username,
      user_id: post.user_id
    }));
    
    res.json({ posts: formattedPosts });
  } catch (err) {
    console.error('Error in get all posts:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single post
router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    
    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        id, 
        title, 
        content, 
        created_at, 
        user_id,
        users:user_id (username)
      `)
      .eq('id', postId)
      .single();
    
    if (error) {
      console.error('Error fetching post:', error);
      return res.status(500).json({ error: 'Failed to fetch post' });
    }
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Format the post to match the expected structure
    const formattedPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      created_at: post.created_at,
      username: post.users.username,
      user_id: post.user_id
    };
    
    res.json({ post: formattedPost });
  } catch (err) {
    console.error('Error in get single post:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a post (requires authentication)
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;
    
    // Basic validation
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    // Insert post
    const { data: newPost, error } = await supabase
      .from('posts')
      .insert([
        { title, content, user_id: userId }
      ])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({ error: 'Failed to create post' });
    }
    
    // Get the username for the response
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('username')
      .eq('id', userId)
      .single();
    
    if (userError) {
      console.error('Error fetching username:', userError);
    }
    
    // Format the post with username for the response
    const post = {
      ...newPost,
      username: user ? user.username : null
    };
    
    res.status(201).json({ post });
  } catch (err) {
    console.error('Error in create post:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a post (requires authentication and ownership)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const { title, content } = req.body;
    
    // Basic validation
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    // Check if post exists and belongs to user
    const { data: existingPost, error: checkError } = await supabase
      .from('posts')
      .select('id, user_id')
      .eq('id', postId)
      .single();
    
    if (checkError) {
      console.error('Error fetching post:', checkError);
      return res.status(500).json({ error: 'Failed to fetch post' });
    }
    
    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    if (existingPost.user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized to update this post' });
    }
    
    // Update post
    const { data: updatedPost, error } = await supabase
      .from('posts')
      .update({ title, content })
      .eq('id', postId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating post:', error);
      return res.status(500).json({ error: 'Failed to update post' });
    }
    
    // Get the username for the response
    const { data: user } = await supabase
      .from('users')
      .select('username')
      .eq('id', userId)
      .single();
    
    // Format the post with username for the response
    const post = {
      ...updatedPost,
      username: user ? user.username : null
    };
    
    res.json({ post });
  } catch (err) {
    console.error('Error in update post:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a post (requires authentication and ownership)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    
    // Check if post exists and belongs to user
    const { data: existingPost, error: checkError } = await supabase
      .from('posts')
      .select('id, user_id')
      .eq('id', postId)
      .single();
    
    if (checkError) {
      console.error('Error fetching post:', checkError);
      return res.status(500).json({ error: 'Failed to fetch post' });
    }
    
    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    if (existingPost.user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized to delete this post' });
    }
    
    // Delete post
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);
    
    if (error) {
      console.error('Error deleting post:', error);
      return res.status(500).json({ error: 'Failed to delete post' });
    }
    
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error in delete post:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
