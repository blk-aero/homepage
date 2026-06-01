# ==========================================
# LOCAL DEVELOPMENT DOCKERFILE
# This container environment is strictly for local dev/testing.
# Production site is built and deployed as a static site to GitHub Pages.
# ==========================================

FROM node:20-alpine

WORKDIR /app

# Copy dependency specifications
COPY package*.json ./

# Install development and production dependencies
RUN npm ci

# Copy application source
COPY . .

# Expose port used by Astro dev server
EXPOSE 4321

# Start the Astro dev server bound to all interfaces for container networking
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
