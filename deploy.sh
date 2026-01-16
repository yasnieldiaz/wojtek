#!/bin/bash

# =====================================================
# WOJTEK - Script de Despliegue a Producción
# Servidor: 188.137.65.235
# Dominio: wojtek.esix.online
# =====================================================

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     WOJTEK - Despliegue a Producción              ║${NC}"
echo -e "${BLUE}║     https://wojtek.esix.online                    ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════╝${NC}"
echo ""

# Configuración
SERVER="188.137.65.235"
USER="root"
APP_DIR="/var/www/wojtek"
PM2_APP="wojtek"

# 1. Verificar cambios locales
echo -e "${YELLOW}[1/5] Verificando cambios locales...${NC}"
if [[ -n $(git status --porcelain) ]]; then
    echo -e "${YELLOW}Hay cambios sin commitear. Commiteando...${NC}"
    git add -A
    read -p "Mensaje del commit: " COMMIT_MSG
    git commit -m "$COMMIT_MSG

Co-Authored-By: Claude <noreply@anthropic.com>"
fi

# 2. Push a GitHub
echo -e "${YELLOW}[2/5] Subiendo a GitHub...${NC}"
git push origin main
echo -e "${GREEN}✓ GitHub actualizado${NC}"

# 3. Desplegar en servidor
echo -e "${YELLOW}[3/5] Desplegando en servidor...${NC}"
ssh $USER@$SERVER << 'ENDSSH'
    cd /var/www/wojtek

    echo "Pulling changes..."
    git pull origin main

    echo "Installing dependencies..."
    npm install --production

    echo "Restarting PM2..."
    pm2 restart wojtek

    echo "PM2 Status:"
    pm2 list | grep wojtek
ENDSSH

echo -e "${GREEN}✓ Servidor actualizado${NC}"

# 4. Verificar que el sitio funciona
echo -e "${YELLOW}[4/5] Verificando sitio...${NC}"
HTTP_STATUS=$(curl -s -o /dev/null -w '%{http_code}' -k https://wojtek.esix.online/)
if [ "$HTTP_STATUS" == "200" ]; then
    echo -e "${GREEN}✓ Sitio funcionando (HTTP $HTTP_STATUS)${NC}"
else
    echo -e "${RED}✗ Error: HTTP $HTTP_STATUS${NC}"
    exit 1
fi

# 5. Listo
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     ✓ DESPLIEGUE COMPLETADO                       ║${NC}"
echo -e "${GREEN}║     https://wojtek.esix.online                    ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════╝${NC}"
