FROM node:14.16.0-alpine3.10
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . ./
copy .env.production .env

RUN npm run build
ENV NODE_ENV production
EXPOSE 8080

CMD ["node", "dist/index.js"]
USER node