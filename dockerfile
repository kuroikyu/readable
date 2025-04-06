# Use a Node.js base image with pnpm pre-installed
FROM node:18-alpine AS builder

# Install pnpm globally (if not already present in the image)
RUN npm install -g pnpm # this is often not needed on node alpine images as pnpm is already installed

# Set the working directory
WORKDIR /app

# Copy the server folder
COPY ./server/ ./

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./


EXPOSE 3000

# Start the server
CMD pnpx json-server ./readable-db.json -s ./public
