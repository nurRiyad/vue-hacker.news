FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Build file
RUN npm run build-only 

# Start command
CMD [ "npm", "run", "preview"]
