FROM node:14

# Cria o diretório .ssh e define as permissões
RUN mkdir -p /root/.ssh && chmod 700 /root/.ssh

# Copia o código do backend para o diretório /usr/src/app
WORKDIR /backend

# Copia o script de entrada
# COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

# Instala as dependências do backend
RUN npm install

COPY src/ src/

# Define o comando para iniciar o backend
# ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "start"]
