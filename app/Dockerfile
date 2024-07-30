# Dockerfile in takehome/app

FROM node:20.14.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["sh", "start.sh"]
