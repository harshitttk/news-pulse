# Dockerfile for backend
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend files
COPY . .

# Expose the port the backend runs on
EXPOSE 4000

# Run the application
CMD ["npm", "start"]
