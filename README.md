# AI-Powered Data Automation Platform

A comprehensive platform that combines Next.js, FastAPI, and Google's Gemini API to create a no-code solution for data analysis, visualization, and machine learning with educational components.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/adhithans-projects/v0-comprehensive-project-plan)

## Overview

The AI-Powered Data Automation Platform is designed to democratize data science by providing an intuitive interface with educational components. It leverages Google's Gemini API for AI-powered suggestions and guidance, enabling users to process any dataset with automated insights and learning opportunities at each step.

## Features

- **Data Management**: Upload, explore, and transform datasets
- **Machine Learning**: Train models, make predictions, and evaluate performance
- **Automated EDA**: Generate insights and visualizations automatically
- **AI Suggestions**: Get AI-powered recommendations for analysis and visualization
- **Educational Content**: Learn data science concepts with personalized explanations

## Architecture

The platform consists of two main components:

1. **Frontend**: Next.js application with React components
2. **Backend**: FastAPI server for data processing, ML, and AI integration

### Technology Stack

- **Frontend**: Next.js, React, TypeScript, shadcn/ui
- **Backend**: FastAPI, Python, scikit-learn, pandas
- **Database**: PostgreSQL, Redis
- **AI**: Google Gemini API
- **Infrastructure**: Docker, Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- Docker and Docker Compose (optional)
- Google Gemini API key

### Installation

1. Clone the repository
2. Install frontend dependencies:

```bash
npm install
```

3. Set up the backend:

```bash
cd backend
chmod +x setup.sh
./setup.sh
pip install -r requirements.txt
```

4. Create a `.env` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
GEMINI_API_KEY=your-gemini-api-key
```

### Running the Application

#### Using Docker Compose

```bash
docker-compose up
```

#### Manual Start

1. Start the backend:

```bash
cd backend
uvicorn main:app --reload
```

2. Start the frontend:

```bash
npm run dev
```

3. Initialize and seed the database with initial data (including developer account):

```bash
# Run the complete database setup (recommended)
node scripts/setup-db.js

# Or run the steps individually:
# Initialize the database tables
node scripts/init-db.js

# Seed the database with initial data
node scripts/seed-db.js
```

### Developer Mode

For development purposes, you can use the following credentials:

- **Email**: adhithanraja6@gmail.com
- **Password**: idlypoDa@12

This developer account will be created automatically when you run the database seeding script.

## Project Structure

- `app/`: Next.js application routes
- `components/`: React components
- `lib/`: Utility functions and API clients
- `backend/`: FastAPI backend
  - `ai/`: Gemini API integration
  - `data_processing/`: Data processing utilities
  - `ml/`: Machine learning model training and prediction
  - `eda/`: Automated exploratory data analysis
  - `education/`: Educational content generation

## Development Roadmap

- [x] Project setup and architecture
- [x] FastAPI backend implementation
- [x] Gemini API integration
- [x] Data processing engine
- [x] Machine learning framework
- [x] Educational content generation
- [ ] Frontend integration with backend
- [ ] Comprehensive visualization engine
- [ ] User authentication and project management
- [ ] Deployment pipeline

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.