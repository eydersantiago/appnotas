FROM node:18.17.1

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto definido en las variables de entorno
EXPOSE ${PORT}

# Inicia la aplicación
CMD ["node", "src/server.js"]