#!/bin/bash
set -xe

# Copiar os arquivos build para o servidor EC2
scp -i "$DEPLOY_PRIVATE_KEY" -o StrictHostKeyChecking=no -r build/* ubuntu@$EC2_PUBLIC_IP:/home/ubuntu/sustentare-web/build

# Conectar via SSH e rodar os comandos de deploy
ssh -i "$DEPLOY_PRIVATE_KEY" -o StrictHostKeyChecking=no ubuntu@$EC2_PUBLIC_IP << 'EOF'
  cd /home/ubuntu/sustentare-web
  git pull origin main
  npm install
  npm run build
  pm2 restart sustentare-web || pm2 start build/ --name sustentare-web
EOF