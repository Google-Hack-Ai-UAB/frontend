FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY public /app/public
COPY src /app/src
COPY tailwind.config.js /app/tailwind.config.js

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]
