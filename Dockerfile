FROM node:latest

RUN npm i -g yarn

RUN yarn global add @adonisjs/cli

WORKDIR /var/www/sac_app
COPY ./sac_app/package.json ./sac_app/yarn.lock ./

COPY ./sac_app .

RUN yarn

# CMD ["adonis", "serve"]
