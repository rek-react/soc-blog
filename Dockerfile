FROM node:18.16.1-alpine3.18

WORKDIR /app/client

COPY client/package*.json ./

RUN npm install -f

COPY client/ ./

RUN npm run build



WORKDIR /app/server

COPY server/package*.json ./

RUN npm install -qy

COPY server/ ./

ENV PORT 80

EXPOSE 80

CMD ["npm", "run", "start"]
