# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Use a lightweight web server for production
# FROM node:18-alpine AS runner

# WORKDIR /app

# # Copy the built application from the builder stage
# COPY --from=builder /app/.next .next
# COPY --from=builder /app/package.json package.json
# COPY --from=builder /app/public public
# COPY --from=builder /app/node_modules node_modules

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "start"]
