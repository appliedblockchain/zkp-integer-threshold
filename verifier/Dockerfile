FROM node:11.8.0-alpine

RUN mkdir /home/node/verifier

WORKDIR /home/node/verifier

COPY zkp /home/node/zkp

COPY verifier/package* /home/node/verifier/

RUN npm i

COPY verifier /home/node/verifier

CMD [ "npm", "start" ]