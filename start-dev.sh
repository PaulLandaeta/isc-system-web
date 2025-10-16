#!/bin/bash

echo "Verificando entorno de desarrollo"

if ! command -v node &> /dev/null; then
    echo "Error: Node.js no está instalado. Instálalo y vuelve a intentarlo."
    exit 1
fi

NODE_VERSION=$(node -v | sed 's/v//')
REQUIRED_VERSION="20.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "Error: Se requiere Node.js versión 20.0.0 o superior. Versión detectada: $NODE_VERSION"
    exit 1
fi

echo "Node.js detectado: $NODE_VERSION"

echo "Instalando dependencias"
npm install || { echo "Error al instalar dependencias."; exit 1; }

if [ ! -f ".env" ]; then
    echo "Error: No se encontró .env, crea un archivo .env manualmente."
    exit 1
fi

echo "Levantando el servidor"
npm run dev -- --port 5173
