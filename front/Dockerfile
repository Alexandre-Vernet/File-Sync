FROM node:18-alpine as build

WORKDIR /app

COPY front/package*.json ./

RUN npm install --production

COPY front/. ./

RUN npm run build

FROM nginx:alpine

COPY front/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html
