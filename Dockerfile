FROM node:0.12-onbuild

# Bundle app source
ADD . /app
WORKDIR /app

# Install app dependencies
RUN npm install && npm install -g pm2

EXPOSE  8080

CMD ["npm", "start"]