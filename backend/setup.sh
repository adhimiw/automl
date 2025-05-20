#!/bin/bash

# Create necessary directories
mkdir -p uploads
mkdir -p models

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env file from .env.example. Please update with your API keys."
fi

echo "Setup complete!"
