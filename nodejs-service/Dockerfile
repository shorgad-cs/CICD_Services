FROM node:20-slim

WORKDIR /app

# Copy package dependencies and install
COPY package*.json ./
RUN npm install --only=production

# Copy application source files
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]