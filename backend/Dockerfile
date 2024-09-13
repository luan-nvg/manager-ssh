# Usando a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código do backend para o diretório de trabalho
COPY . .

# Expõe a porta que o backend usará
EXPOSE 3008

# Inicia o servidor backend
CMD ["node", "app.js"]
