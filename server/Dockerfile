FROM node:20-slim

WORKDIR /app

# Install openssl for Prisma and ca-certificates
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Ensure uploads directory exists
RUN mkdir -p uploads

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code and Prisma schema
COPY . .

# Generate Prisma client
RUN npx prisma generate

ENV PORT=10000
EXPOSE 10000

# Start the server
CMD ["node", "src/server.js"]
