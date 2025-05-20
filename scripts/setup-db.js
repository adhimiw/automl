#!/usr/bin/env node

/**
 * This script initializes and seeds the database
 * Run with: node scripts/setup-db.js
 */

const fetch = require('node-fetch');

async function setupDatabase() {
  console.log('Setting up database...');
  
  try {
    // Step 1: Initialize database tables
    console.log('Step 1: Initializing database tables...');
    const initResponse = await fetch('http://localhost:3000/api/db/init', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!initResponse.ok) {
      const initData = await initResponse.json();
      console.error('❌ Failed to initialize database:');
      console.error(initData);
      return;
    }
    
    console.log('✅ Database initialized successfully!');
    
    // Step 2: Seed the database
    console.log('\nStep 2: Seeding database with initial data...');
    const seedResponse = await fetch('http://localhost:3000/api/seed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Get the full response text for debugging
    const responseText = await seedResponse.text();
    let seedData;
    
    try {
      // Try to parse as JSON
      seedData = JSON.parse(responseText);
    } catch (e) {
      // If not valid JSON, use the raw text
      seedData = { error: 'Invalid JSON response', details: responseText };
    }
    
    if (seedResponse.ok) {
      console.log('✅ Database seeded successfully!');
      console.log(seedData);
      
      console.log('\n🎉 Database setup complete!');
      console.log('\nDeveloper login credentials:');
      console.log('- Email: adhithanraja6@gmail.com');
      console.log('- Password: idlypoDa@12');
    } else {
      console.error('❌ Failed to seed database:');
      console.error(seedData);
      console.error('Status code:', seedResponse.status);
    }
  } catch (error) {
    console.error('❌ Error setting up database:');
    console.error(error.message);
    console.error('Make sure the development server is running on http://localhost:3000');
  }
}

setupDatabase();
