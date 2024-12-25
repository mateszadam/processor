FROM node
WORKDIR /home/node/app
COPY ./db.json .
RUN npm i -g json-server
ENTRYPOINT ["json-server", "db.json", "-h", "0.0.0.0"]