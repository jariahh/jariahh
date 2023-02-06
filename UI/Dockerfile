FROM nginx:alpine AS base
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
WORKDIR /app

FROM node:18-bullseye-slim AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN npm i -g @angular/cli
COPY package.json /app/package.json
RUN npm i -y
COPY . .
RUN ng build

FROM base AS final
WORKDIR /usr/share/nginx/html
COPY --from=build /app/docs/web-ui/ .
CMD ["nginx", "-g", "daemon off;"]
