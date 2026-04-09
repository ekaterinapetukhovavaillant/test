FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]