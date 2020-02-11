FROM node:latest

WORKDIR /var/www/sac_app
COPY . .

RUN yarn

# CMD ["adonis", "serve"]
