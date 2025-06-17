# Dockerfile for frontend
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Build the frontend for production
RUN npm run build

# Install a lightweight web server for static files
RUN npm install -g serve

# Expose the port serve uses
EXPOSE 5173

# Serve the build folder
CMD ["serve", "-s", "dist", "-l", "5173"]
