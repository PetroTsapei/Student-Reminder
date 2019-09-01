FROM node:latest

WORKDIR /app

RUN npm install nodemon -g

COPY package.json /app/package.json
RUN npm install

COPY src/index.js /app

EXPOSE 3005
