# Use Node.js image
FROM node:18-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port and start the application
EXPOSE 3000
CMD ["npm", "run", "start"]