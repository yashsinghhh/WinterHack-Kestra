# # Use the official Node.js LTS image as a base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (changed to 5001)
EXPOSE 5001

# Start the Node.js application
CMD ["npm", "start"]
