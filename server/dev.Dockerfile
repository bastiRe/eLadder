FROM node:16.13.1-alpine

WORKDIR /usr/src/api

CMD ["yarn", "run", "serve"]
