FROM node:18-alpine

RUN apk add --no-cache ca-certificates curl \
  && update-ca-certificates

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

##! build ya da dev compose üzerinden gelecek