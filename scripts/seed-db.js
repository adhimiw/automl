#!/usr/bin/env node

/**
 * This script seeds the database with initial data
 * Run with: node scripts/seed-db.js
 */

const fetch = require('node-fetch');

async function seedDatabase() {
  console.log('Seeding database...');

  try {
    // First, make sure the database is initialized
    console.log('Initializing database tables...');
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

    // Now seed the database
    console.log('Adding seed data...');
    const response = await fetch('http://localhost:3000/api/seed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Get the full response text for debugging
    const responseText = await response.text();
    let data;

    try {
      // Try to parse as JSON
      data = JSON.parse(responseText);
    } catch (e) {
      // If not valid JSON, use the raw text
      data = { error: 'Invalid JSON response', details: responseText };
    }

    if (response.ok) {
      console.log('✅ Database seeded successfully!');
      console.log(data);
    } else {
      console.error('❌ Failed to seed database:');
      console.error(data);
      console.error('Status code:', response.status);
    }
  } catch (error) {
    console.error('❌ Error seeding database:');
    console.error(error.message);
    console.error('Make sure the development server is running on http://localhost:3000');
  }
}

seedDatabase();
