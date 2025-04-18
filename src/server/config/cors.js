
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://jobseekaroo.com', 
        'https://jobseekers4hs.org', 
        'https://jobseeker4hs.org',
        /\.jobseekaroo\.com$/,
        /\.jobseekers4hs\.org$/,
        /\.jobseeker4hs\.org$/
      ]
    : ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

module.exports = corsOptions;
