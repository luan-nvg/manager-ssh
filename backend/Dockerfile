# Usa a imagem node:14
FROM node:14

# Cria o diretório .ssh e define as permissões
RUN mkdir -p /root/.ssh && chmod 700 /root/.ssh

# Define o diretório de trabalho
WORKDIR /backend

# Copia o package.json e o package-lock.json (se existir) para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do backend
RUN npm install

# Copia o restante do código do backend para o container
COPY . .

# Define o comando para iniciar o backend
CMD ["npm", "start"]
