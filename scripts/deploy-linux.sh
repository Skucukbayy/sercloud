#!/bin/bash

# SerCloud Linux Deployment Script
# Supports Ubuntu/Debian/CentOS
# Requires: Node.js 18+, NPM, PM2

set -e # Exit on error

APP_DIR=$(pwd)
LOG_DIR="$APP_DIR/logs"

echo "🚀 Starting SerCloud Deployment..."

# 1. Check Prerequisites
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+."
    exit 1
fi

if ! command -v pm2 &> /dev/null; then
    echo "⚠️ PM2 not found. Installing globally..."
    npm install -g pm2
fi

# 2. Install Dependencies
echo "📦 Installing dependencies..."
npm ci --production

# 3. Build Application
echo "🏗️ Building Next.js application..."
npm run build

# 4. Setup Logs
if [ ! -d "$LOG_DIR" ]; then
    mkdir -p "$LOG_DIR"
    echo "📁 Created logs directory."
fi

# 5. Start/Restart with PM2
echo "🔄 Starting application with PM2..."
if pm2 list | grep -q "ser-cloud"; then
    pm2 reload ecosystem.config.cjs
    echo "✅ Application reloaded."
else
    pm2 start ecosystem.config.cjs
    echo "✅ Application started."
fi

# 6. Save PM2 List
pm2 save

echo "🎉 Deployment Complete! SerCloud is running."
echo "👉 Monitor logs with: pm2 logs ser-cloud"
