FROM node:latest

WORKDIR /app

COPY . .

COPY package*.json ./

RUN npm install

CMD npm start
