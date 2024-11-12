FROM node:18.17.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

# Iniciar la aplicación
CMD ["node", "index.js"]