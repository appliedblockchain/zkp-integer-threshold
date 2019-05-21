FROM node:11.8.0

RUN mkdir /home/node/verifier

WORKDIR /home/node/verifier

COPY zkp /home/node/zkp

COPY verifier/package* ./

RUN npm i

COPY verifier /home/node/verifier

CMD [ "npm", "start" ]