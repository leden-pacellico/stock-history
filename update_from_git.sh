#!/bin/bash

# Stop the stock-history service
sudo systemctl stop stock-history.service

# stop container
sudo docker stop stock-history-container

# Navigate to the directory containing the Dockerfile
cd ~/stock-history

# Rebuild the Docker image
sudo docker build --no-cache -t stock-history-image .

# Remove the existing container
sudo docker rm -f stock-history-container

# Run the new container with port mapping
sudo docker run -d -p 3000:3000 --name stock-history-container stock-history-image

# Start the stock-history service
sudo systemctl start stock-history.service

sudo docker logs stock-history-container

echo "Update and deployment complete."


