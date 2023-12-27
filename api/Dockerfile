FROM node:18-alpine as build

WORKDIR /app

COPY api/package*.json ./

RUN npm install --production

COPY api/ ./

CMD ["node", "server.js"]

EXPOSE 3000