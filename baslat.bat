@echo off
title SellZone Pazaryeri Sunucusu
echo ==============================================
echo   SellZone Pazaryeri Baslatiliyor...
echo   Adres: http://localhost:3000
echo ==============================================
cd /d "%~dp0"
start http://localhost:3000
node server.js
pause
