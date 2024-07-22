# Etapa de construcción
FROM node:20-alpine as builder

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

# Etapa de producción
FROM node:20-alpine

WORKDIR /app

ENV SERVER_PORT=80

COPY --from=builder /app/package*.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist

EXPOSE 80

CMD ["node", "dist/main.js"]
