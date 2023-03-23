# Defines the base image
FROM node:latest

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


# STAGE 2: Run ###
FROM nginx:alpine
# Copies the front-end files from the build stage
COPY --from=0 /app/dist /usr/share/nginx/html

# Exposes the port 80
EXPOSE 80

# Starts the nginx server
CMD ["nginx", "-g", "daemon off;"]
