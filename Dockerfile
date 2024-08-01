# Etapa de construcción
FROM node:20-alpine as builder

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY package*.json ./

RUN npm install

COPY .. .

RUN npm run build

# Etapa de producción
FROM node:20-alpine

WORKDIR /app

ENV SERVER_PORT=80
ENV AWS_REGION=us-east-2
ENV AWS_ACCESS_KEY_ID=''
ENV AWS_SECRET_ACCESS_KEY=''

COPY --from=builder /app/package*.json ./
RUN npm install

COPY --from=builder /app/dist ./dist

EXPOSE 80

CMD ["node", "dist/main.js"]
