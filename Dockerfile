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

COPY --from=builder /app/package*.json ./
RUN npm install

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main.js"]
