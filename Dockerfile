# Imagen base
FROM node:18-alpine

# Crea y define el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias (usa npm ci para builds limpios)
RUN npm ci --only=production

# Copia el resto del proyecto
COPY . .

# Expone el puerto (usa el mismo que tu app usa, por ejemplo 3000)
EXPOSE 3000

# Comando de inicio
CMD ["node", "server.js"]