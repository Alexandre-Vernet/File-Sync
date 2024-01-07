FROM node:18-alpine as build

WORKDIR /app

COPY front/package*.json ./front/

RUN cd front && npm install --production

COPY front/. ./front/

RUN cd front && npm run build

FROM nginx:alpine

COPY --from=build /app/front/dist /usr/share/nginx/html
