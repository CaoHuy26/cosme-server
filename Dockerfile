FROM node:latest

#Specify a working directory
WORKDIR /usr/app

COPY ./package.json ./

RUN npm install 

#Copy remaining files
COPY ./ ./

#Default command
CMD ["npm","start"]