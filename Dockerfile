FROM node:18-alpine3.16
ARG PORT
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE ${PORT}
CMD ["npm", "start"]