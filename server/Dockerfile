FROM node:20-alpine

WORKDIR /app

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
