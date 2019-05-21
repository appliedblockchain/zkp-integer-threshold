FROM node:11.8.0

RUN mkdir /home/node/kyc-provider

WORKDIR /home/node/kyc-provider

COPY zkp /home/node/zkp

COPY kyc-provider/package* ./

RUN npm i

COPY kyc-provider /home/node/kyc-provider

CMD [ "npm", "start" ]