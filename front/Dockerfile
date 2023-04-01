# Stage 1 - Building the application
FROM node:14.16.1-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

# Stage 2 - Deploying the application
FROM renderapp/render:18

COPY --from=build /app/dist /app

ENV PORT=8080

CMD ["npm", "start"]
