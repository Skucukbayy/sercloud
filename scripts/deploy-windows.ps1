# SerCloud - Windows Server 2016 Deployment Script
# Requirements: Node.js, IIS, HttpPlatformHandler

Write-Host "--- SerCloud Deployment on Windows Server ---" -ForegroundColor Cyan

# 1. Install dependencies
Write-Host "Installing dependencies..."
npm install --production

# 2. Build the application
Write-Host "Building SerCloud for Production..."
npm run build

# 3. Setup IIS Logs directory
If (!(Test-Path -Path ".\logs")) {
    New-Item -ItemType Directory -Path ".\logs"
    Write-Host "Created logs directory."
}

# 4. Permissions (Simple version for demo)
# icacls . /grant "IIS AppPool\DefaultAppPool:(OI)(CI)RX"

Write-Host "Deployment preparation complete." -ForegroundColor Green
Write-Host "Next steps:"
Write-Host "1. Create an IIS Site pointing to this folder."
Write-Host "2. Ensure HttpPlatformHandler is installed in IIS."
Write-Host "3. The application will start automatically on first request."
