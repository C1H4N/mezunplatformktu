FROM node:20-alpine

RUN apk add --no-cache ca-certificates curl \
  && update-ca-certificates

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

##! build ya da dev compose üzerinden gelecek