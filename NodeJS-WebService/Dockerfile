FROM node:alpine
COPY package.json package.json
RUN npm install
COPY app.js .
CMD node app.js
EXPOSE 3001

