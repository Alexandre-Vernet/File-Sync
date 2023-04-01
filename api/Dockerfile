FROM node:18-alpine as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install --production

COPY . .

CMD ["npm", "start"]
