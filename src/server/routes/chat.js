
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Simple in-memory cache for frequent questions
const responseCache = new Map();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour cache expiry

/**
 * Chat endpoint that connects to OpenAI's API
 */
router.post('/chat', async (req, res) => {
  const { message } = req.body;
  
  // Input validation
  if (!message || typeof message !== 'string' || message.length > 1000) {
    return res.status(400).json({ error: 'Invalid message format or length' });
  }
  
  // Get API key from environment variable
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error("Missing OpenAI API key");
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }
  
  try {
    // Check cache first
    const cacheKey = message.toLowerCase().trim();
    if (responseCache.has(cacheKey)) {
      const cachedResponse = responseCache.get(cacheKey);
      if (Date.now() - cachedResponse.timestamp < CACHE_TTL) {
        return res.json({ reply: cachedResponse.reply, cached: true });
      } else {
        // Cache expired, remove it
        responseCache.delete(cacheKey);
      }
    }
    
    // Call OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful job search assistant that provides advice on job applications, interviews, and career development.'
          },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7
      },
      { 
        headers: { Authorization: `Bearer ${apiKey}` },
        timeout: 10000  // 10 second timeout
      }
    );
    
    const reply = response.data.choices[0].message.content;
    
    // Store in cache
    responseCache.set(cacheKey, {
      reply,
      timestamp: Date.now()
    });
    
    // Clean up old cache entries (async)
    setTimeout(() => {
      const now = Date.now();
      for (const [key, value] of responseCache.entries()) {
        if (now - value.timestamp > CACHE_TTL) {
          responseCache.delete(key);
        }
      }
    }, 0);
    
    return res.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    
    if (error.response) {
      // OpenAI API error
      return res.status(error.response.status).json({ 
        error: `OpenAI Error: ${error.response.data.error?.message || 'Unknown API error'}` 
      });
    } else if (error.code === 'ECONNABORTED') {
      return res.status(504).json({ error: 'Request timeout' });
    }
    
    return res.status(500).json({ 
      error: 'Failed to process your request',
      message: process.env.NODE_ENV === 'production' ? undefined : error.message
    });
  }
});

module.exports = router;
