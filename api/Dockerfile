FROM node:18-alpine as build

WORKDIR /app

COPY api/package*.json ./

RUN npm install --production

COPY api/ ./

RUN nano .env

CMD ["node", "server.js"]