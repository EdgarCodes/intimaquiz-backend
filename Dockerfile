# Use the official Node.js 18 image.
FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including 'devDependencies'
RUN npm install

# Copy over the source code
COPY src/ ./src/
COPY tsconfig.json ./

# Compile TypeScript to JavaScript
RUN npm run build

# Bind the port that the app runs on
EXPOSE 80

# Run the compiled app
CMD [ "npm", "start" ]