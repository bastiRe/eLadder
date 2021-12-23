FROM node:12.18.3-alpine

WORKDIR /usr/src/api
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

# Environment Variables
ENV PORT $PORT

CMD ["yarn", "run", "serve"]