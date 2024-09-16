#!/bin/sh

# Copia o arquivo authorized_keys para o volume, se não estiver presente
if [ ! -f /root/.ssh/authorized_keys ]; then
  cp /path/to/authorized_keys /root/.ssh/authorized_keys
  chmod 600 /root/.ssh/authorized_keys
fi

# Executa o comando padrão
exec "$@"
