FROM node:16
WORKDIR /rabbitmq-notification
COPY package.json .
RUN npm install
COPY . .
CMD npm start