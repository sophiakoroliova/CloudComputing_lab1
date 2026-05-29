# Stage 1: Збірка (build) на основі Node.js
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production на основі nginx
FROM nginx:stable-alpine
# Копіюємо зібрані файли з Stage 1
COPY --from=build /app/dist /usr/share/nginx/html
# Копіюємо нашу конфігурацію nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80