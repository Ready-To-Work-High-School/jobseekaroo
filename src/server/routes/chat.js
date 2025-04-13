
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Simple in-memory cache for frequent questions
const responseCache = new Map();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour cache expiry

// Fallback responses when API key is missing or quota is exceeded
const FALLBACK_RESPONSES = {
  default: "I'm here to help with your job search! While the AI service is currently unavailable, I can still provide some general guidance.",
  resume: "When creating your resume, focus on these key elements: 1) Clear contact information, 2) Strong summary statement, 3) Relevant skills section, 4) Experience with measurable achievements, and 5) Education and certifications.",
  interview: "For interview preparation: 1) Research the company thoroughly, 2) Practice common questions using the STAR method, 3) Prepare thoughtful questions to ask, 4) Dress professionally, and 5) Follow up with a thank-you note.",
  skills: "Key skills employers look for in entry-level candidates include: communication, teamwork, problem-solving, adaptability, time management, and basic technical skills relevant to your field."
};

/**
 * Get a fallback response when API is unavailable
 */
function getFallbackResponse(message) {
  const lowerCaseMessage = message.toLowerCase();
  
  if (lowerCaseMessage.includes('resume')) {
    return FALLBACK_RESPONSES.resume;
  } else if (lowerCaseMessage.includes('interview')) {
    return FALLBACK_RESPONSES.interview;
  } else if (lowerCaseMessage.includes('skill')) {
    return FALLBACK_RESPONSES.skills;
  }
  
  return FALLBACK_RESPONSES.default;
}

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
  
  // If API key is missing, use fallback responses
  if (!apiKey) {
    console.error("Missing OpenAI API key");
    const fallbackReply = getFallbackResponse(message);
    return res.json({ reply: fallbackReply, fallback: true });
  }
  
  try {
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
    
    // Check if it's an OpenAI API quota error
    const isQuotaError = error.response?.data?.error?.message?.includes('quota') || 
                        error.response?.data?.error?.message?.includes('exceeded');
    
    if (isQuotaError) {
      // Use fallback response for quota errors
      const fallbackReply = getFallbackResponse(message);
      return res.json({ reply: fallbackReply, fallback: true });
    }
    
    if (error.response) {
      // For other OpenAI API errors, send the error message
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
