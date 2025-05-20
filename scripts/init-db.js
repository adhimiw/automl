#!/usr/bin/env node

/**
 * This script initializes the database tables
 * Run with: node scripts/init-db.js
 */

const fetch = require('node-fetch');

async function initializeDatabase() {
  console.log('Initializing database tables...');
  
  try {
    const response = await fetch('http://localhost:3000/api/db/init', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Database initialized successfully!');
      console.log(data);
    } else {
      console.error('❌ Failed to initialize database:');
      console.error(data);
    }
  } catch (error) {
    console.error('❌ Error initializing database:');
    console.error(error.message);
    console.error('Make sure the development server is running on http://localhost:3000');
  }
}

initializeDatabase();
