FROM node:latest
ARG PORT
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE ${PORT}
CMD ["npm", "start"]