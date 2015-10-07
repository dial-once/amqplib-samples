FROM node:0.10-onbuild

# Bundle app source
COPY . /app
RUN cd /app 
# Install app dependencies
RUN npm install && npm install -g pm2

EXPOSE  8080
CMD ["npm", "start"]