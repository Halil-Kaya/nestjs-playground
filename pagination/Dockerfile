FROM node:lts-alpine3.14 as builder
WORKDIR /usr/src/app
ADD . /usr/src/app/
RUN npm install --force
CMD npm run start:dev