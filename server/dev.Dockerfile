FROM node:12.18.3-alpine

WORKDIR /usr/src/api

CMD ["yarn", "run", "serve"]
