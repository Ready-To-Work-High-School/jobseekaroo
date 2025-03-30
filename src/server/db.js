
// Database setup and operations
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { hashPassword } = require('./auth');

// In-memory database for development
const db = new sqlite3.Database(':memory:');

// Initialize database with tables and sample data
const initializeDatabase = () => {
  console.log('Initializing database...');
  
  // Create users table
  db.serialize(() => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Posts table
    db.run(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);
    
    // Add some sample users if none exist
    db.get('SELECT COUNT(*) as count FROM users', async (err, row) => {
      if (err) {
        console.error('Error checking users table:', err);
        return;
      }
      
      if (row.count === 0) {
        // Sample users with hashed passwords
        const sampleUsers = [
          { username: 'testuser', email: 'test@example.com', password: await hashPassword('password123') },
          { username: 'johndoe', email: 'john@example.com', password: await hashPassword('securepass') }
        ];
        
        // Insert sample users
        const insertUserStmt = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
        sampleUsers.forEach(user => {
          insertUserStmt.run(user.username, user.email, user.password);
        });
        insertUserStmt.finalize();
        
        console.log('Added sample users to database');
      }
    });
    
    // Add some sample posts if none exist
    db.get('SELECT COUNT(*) as count FROM posts', (err, row) => {
      if (err) {
        console.error('Error checking posts table:', err);
        return;
      }
      
      if (row.count === 0) {
        // Wait for users to be inserted
        setTimeout(() => {
          // Get user IDs
          db.all('SELECT id FROM users', (err, users) => {
            if (err || !users.length) {
              console.error('Error getting users for sample posts:', err);
              return;
            }
            
            // Sample posts
            const samplePosts = [
              { title: 'Getting Started with Express', content: 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.', user_id: users[0].id },
              { title: 'Building Secure APIs', content: 'Security is important when building APIs. Always validate input, use HTTPS, and implement proper authentication.', user_id: users[0].id },
              { title: 'MongoDB vs SQLite', content: 'Both MongoDB and SQLite have their use cases. MongoDB is great for complex, unstructured data while SQLite is perfect for simple, local applications.', user_id: users[1].id }
            ];
            
            // Insert sample posts
            const insertPostStmt = db.prepare('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)');
            samplePosts.forEach(post => {
              insertPostStmt.run(post.title, post.content, post.user_id);
            });
            insertPostStmt.finalize();
            
            console.log('Added sample posts to database');
          });
        }, 1000); // Give time for users to be inserted
      }
    });
  });
};

module.exports = {
  db,
  initializeDatabase
};
