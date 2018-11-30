FROM node:8
EXPOSE 3000
COPY .  /app
RUN apt-get update && apt-get install -y libpcap-dev cmake && apt-get clean
RUN cd /app && npm set progress=false && npm install && npm rebuild
WORKDIR /app
CMD [ "npm", "start" ]
