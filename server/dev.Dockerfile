FROM node:8.9.4-alpine

WORKDIR /usr/src/api

CMD ["yarn", "run", "serve"]
