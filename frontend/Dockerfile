# Usa a imagem oficial do Node.js como base
FROM node:14-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /web

# Copia os arquivos de configuração do pacote para o container
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do projeto para dentro do diretório de trabalho no container
COPY . .

# Expõe a porta que será usada pela aplicação (a porta padrão de desenvolvimento do React é 3000)
EXPOSE 3009

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "start"]
