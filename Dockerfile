# install raspbian linux image
'''
FROM resin/rpi-raspbian:latest
MAINTAINER Asap Labs
ENTRYPOINT []

# update to latest image dependencies/ linux
RUN apt-get update && \
    apt-get -qy install curl \
                build-essential python \
                ca-certificates

WORKDIR /root/

# install raspbian compatible node (and npm)
RUN curl -O \
  https://nodejs.org/dist/v4.5.0/node-v4.5.0-linux-armv6l.tar.gz
RUN tar -xvf node-*.tar.gz -C /usr/local \
  --strip-components=1
'''
# ----------------------------------------------------------
FROM node:carbon
WORKDIR /usr/src/app

# install app dependencies
COPY pacakage*.json ./
RUN npm install
# FOR production 
# RUN npm install --only=production

# Bundle app source
COPY . . 
EXPOSE 8080
CMD ["npm", "start"]