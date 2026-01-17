#!/bin/bash
set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 Configurando variables de entorno en Vercel...${NC}\n"

# Solicitar ruta del archivo de credenciales
read -p "📁 Ruta al archivo JSON de credenciales (ej: ./credentials.json): " CREDS_FILE

# Verificar que existe
if [ ! -f "$CREDS_FILE" ]; then
    echo -e "${RED}❌ Error: No se encuentra el archivo $CREDS_FILE${NC}"
    exit 1
fi

# Verificar que jq está instalado
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}⚠️  'jq' no está instalado. Intentando instalar...${NC}"

    # Detectar OS e instalar jq
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS con brew
        if command -v brew &> /dev/null; then
            brew install jq
        else
            echo -e "${RED}❌ Homebrew no encontrado. Instala brew primero: /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"${NC}"
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if command -v apt-get &> /dev/null; then
            sudo apt-get update && sudo apt-get install -y jq
        elif command -v dnf &> /dev/null; then
            sudo dnf install -y jq
        elif command -v yum &> /dev/null; then
            sudo yum install -y jq
        else
            echo -e "${RED}❌ No se pudo determinar el gestor de paquetes. Instala jq manualmente.${NC}"
            exit 1
        fi
    else
        echo -e "${RED}❌ Sistema operativo no soportado para instalación automática de jq${NC}"
        exit 1
    fi
fi

echo -e "${BLUE}📝 Procesando credenciales...${NC}"
CREDS_JSON=$(cat "$CREDS_FILE" | jq -c '.')
PROJECT_ID=$(echo "$CREDS_JSON" | jq -r '.project_id')

echo -e "${GREEN}✅ Project ID detectado: $PROJECT_ID${NC}\n"

# Función para añadir variable
add_env_var() {
    local name=$1
    local value=$2
    local env=$3

    echo -e "  ${BLUE}→ Añadiendo $name a $env...${NC}"
    echo "$value" | vercel env add "$name" "$env" 2>&1 | grep -q "already exists" && echo "    ⚠️  Ya existe" || echo -e "    ${GREEN}✓${NC}"
}

# Añadir GOOGLE_APPLICATION_CREDENTIALS_JSON
echo -e "${BLUE}📦 Configurando GOOGLE_APPLICATION_CREDENTIALS_JSON...${NC}"
for env in production preview development; do
    add_env_var "GOOGLE_APPLICATION_CREDENTIALS_JSON" "$CREDS_JSON" "$env"
done

# Añadir GOOGLE_CLOUD_PROJECT_ID
echo -e "\n${BLUE}📦 Configurando GOOGLE_CLOUD_PROJECT_ID...${NC}"
for env in production preview development; do
    add_env_var "GOOGLE_CLOUD_PROJECT_ID" "$PROJECT_ID" "$env"
done

# Añadir VERTEX_AI_LOCATION
echo -e "\n${BLUE}📦 Configurando VERTEX_AI_LOCATION...${NC}"
for env in production preview development; do
    add_env_var "VERTEX_AI_LOCATION" "us-central1" "$env"
done

echo -e "\n${GREEN}✨ ¡Variables configuradas exitosamente!${NC}"
echo -e "${BLUE}📋 Verificar con: vercel env ls${NC}\n"
