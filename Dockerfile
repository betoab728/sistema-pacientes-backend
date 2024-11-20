# Imagen base de Node.js (asegurándonos de usar la misma versión que en desarrollo)
FROM node:20-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar todas las dependencias (producción y desarrollo)
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Compilar el proyecto TypeScript a JavaScript
RUN npm run build

# Exponer el puerto usado por la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/index.js"]
