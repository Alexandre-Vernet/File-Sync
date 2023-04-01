# Defines the base image
FROM node:18-alpine as build

# Defines the working directory inside the container
WORKDIR /app

# Copies the package.json and package-lock.json files
COPY package.json .
COPY package-lock.json .

# Installs the dependencies
RUN npm install --prod

# Copies the front-end files
COPY . .

# Builds the front-end
RUN npm run build
