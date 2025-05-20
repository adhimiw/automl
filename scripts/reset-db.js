#!/usr/bin/env node

/**
 * Reset Database Script
 * 
 * This script drops all tables and recreates them with a fresh user.
 * Use with caution as it will delete all data!
 */

const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create a new PostgreSQL client
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB || 'data_automation',
});

async function resetDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('Resetting database...');
    
    // Start a transaction
    await client.query('BEGIN');
    
    // Drop all tables if they exist
    console.log('Dropping all tables...');
    await client.query(`
      DROP TABLE IF EXISTS jobs CASCADE;
      DROP TABLE IF EXISTS audit_logs CASCADE;
      DROP TABLE IF EXISTS feature_flags CASCADE;
      DROP TABLE IF EXISTS analyses CASCADE;
      DROP TABLE IF EXISTS transformations CASCADE;
      DROP TABLE IF EXISTS datasets CASCADE;
      DROP TABLE IF EXISTS projects CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `);
    
    // Create tables
    console.log('Creating tables...');
    
    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Projects table
    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Datasets table
    await client.query(`
      CREATE TABLE IF NOT EXISTS datasets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        file_path VARCHAR(255),
        file_type VARCHAR(50),
        row_count INTEGER,
        column_count INTEGER,
        metadata JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Transformations table
    await client.query(`
      CREATE TABLE IF NOT EXISTS transformations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        dataset_id INTEGER REFERENCES datasets(id) ON DELETE CASCADE,
        result_dataset_id INTEGER REFERENCES datasets(id) ON DELETE SET NULL,
        steps JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Analyses table
    await client.query(`
      CREATE TABLE IF NOT EXISTS analyses (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        dataset_id INTEGER REFERENCES datasets(id) ON DELETE CASCADE,
        analysis_type VARCHAR(50) NOT NULL,
        parameters JSONB,
        results JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Feature flags table
    await client.query(`
      CREATE TABLE IF NOT EXISTS feature_flags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        enabled BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Audit logs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        action VARCHAR(255) NOT NULL,
        entity_type VARCHAR(255),
        entity_id VARCHAR(255),
        details JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Jobs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id VARCHAR(255) PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL,
        data JSONB,
        result JSONB,
        error TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create a test user with ID 1
    console.log('Creating test user...');
    const email = 'adhithanraja6@gmail.com';
    const name = 'Adhithan Raja';
    const password = 'idlypoDa@12';
    const passwordHash = await bcrypt.hash(password, 10);
    
    await client.query(`
      INSERT INTO users (id, email, name, password_hash)
      VALUES (1, $1, $2, $3)
      ON CONFLICT (email) DO UPDATE
      SET name = $2, password_hash = $3
    `, [email, name, passwordHash]);
    
    // Create some feature flags
    console.log('Creating feature flags...');
    await client.query(`
      INSERT INTO feature_flags (name, description, enabled)
      VALUES 
        ('ai_suggestions', 'Enable AI-powered suggestions', true),
        ('advanced_analytics', 'Enable advanced analytics features', true),
        ('beta_features', 'Enable beta features', false)
      ON CONFLICT (name) DO NOTHING
    `);
    
    // Commit the transaction
    await client.query('COMMIT');
    
    console.log('Database reset successfully!');
    console.log('Test user created:');
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}`);
    console.log(`  User ID: 1`);
    
  } catch (error) {
    // Rollback the transaction in case of error
    await client.query('ROLLBACK');
    console.error('Error resetting database:', error);
    throw error;
  } finally {
    // Release the client back to the pool
    client.release();
    await pool.end();
  }
}

// Run the reset function
resetDatabase().catch(err => {
  console.error('Failed to reset database:', err);
  process.exit(1);
});
