FROM node:22.12-slim AS dev

RUN apt-get update -y
RUN apt-get install -y openssl
# Install chromium for puppeteer
RUN apt-get update && \
    apt-get install -y wget gnupg && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list && \
    apt-get update && \
    apt-get install -y google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "start"]
