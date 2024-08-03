#!/bin/sh
echo "Starting server..."
# Verifica la ruta actual y lista los archivos para depuración
pwd
ls -la
# Verifica la versión de yarn
yarn --version
# Inicia el servidor
yarn dev
