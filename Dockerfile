FROM node:24.6.0
WORKDIR /app

COPY package*.json ./
COPY . .
RUN npm install

CMD ["node", "index.js"]