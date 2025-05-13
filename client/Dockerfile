FROM node:22-alpine AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i -f

FROM dependencies AS build

WORKDIR /app

COPY . .

RUN npm run build

FROM node:22-alpine AS stage

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json

EXPOSE 3100

CMD ["npx", "serve", "-s", "build", "-l", "3100"]
