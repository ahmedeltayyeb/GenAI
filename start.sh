#!/bin/bash

# Start MongoDB
sudo systemctl start mongod

# Check if MongoDB started successfully
if systemctl is-active --quiet mongod; then
    echo "MongoDB started successfully."
else
    echo "Failed to start MongoDB. Exiting."
    exit 1
fi

# Navigate to the API folder and start the Flask API
cd api || { echo "API folder not found! Exiting."; exit 1; }

# Prompt for OpenAI Key
read -p "Enter your OpenAI API key: " OPENAI_KEY
export OPENAI_API_KEY="$OPENAI_KEY"

# Create and activate virtual environment if not already active
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask API
python run.py &
API_PID=$!
echo "Flask API started with PID $API_PID"

# Navigate to the mobile app folder and start the React Native app
cd ../mobile-app || { echo "Mobile app folder not found! Exiting."; exit 1; }

# Start the Expo server
npx expo start &
EXPO_PID=$!
echo "Expo started with PID $EXPO_PID"

# Wait for both processes
wait $API_PID $EXPO_PID
