# 1. Base Node Image Pull
FROM node:16.15-alpine AS build
# 2. Work Dir 이동
WORKDIR /app
# 3. npm install 목록 Copy
COPY package*.json ./
# 4. npm install
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.18.0-alpine AS prod-stage

RUN mkdir /app
COPY --from=build /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

# RUN service nginx restart

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
