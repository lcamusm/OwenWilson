# Establecer la imagen base
FROM node:18-alpine as build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y el yarn.lock
COPY package.json yarn.lock ./

# Instalar las dependencias
RUN yarn install

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación
RUN yarn build

# Establecer la imagen base para el contenedor final
FROM nginx:alpine

# Copiar los archivos construidos a la ubicación donde Nginx los pueda servir
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto que Nginx usará
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
