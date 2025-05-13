FROM node:22.12-slim AS dev

RUN apt-get update -y
RUN apt-get install -y openssl

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "start"]
