@echo off
setlocal
title SellZone - Cloudflare Tunnel Yoneticisi
chcp 65001 >nul

echo ================================================================
echo   🛡️  SellZone Pazaryeri - Cloudflare Tunnel Baslatici
echo ================================================================
echo.

cd /d "%~dp0"

REM 1. Cloudflared komutunun varligini kontrol et
where cloudflared >nul 2>nul
if %errorlevel% equ 0 (
    set "CF_CMD=cloudflared"
    goto RUN_TUNNEL
)

if exist "cloudflared.exe" (
    set "CF_CMD=cloudflared.exe"
    goto RUN_TUNNEL
)

echo [!] Sistemde 'cloudflared' bulunamadi.
echo [!] Cloudflare Quick Tunnel icin resmi arac indiriliyor...
echo.

powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Write-Host 'Cloudflared indiriliyor...'; Invoke-WebRequest -Uri 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe' -OutFile 'cloudflared.exe'"

if not exist "cloudflared.exe" (
    echo.
    echo [HATA] Otomatik indirme basarisiz oldu.
    echo Lutfen https://github.com/cloudflare/cloudflared/releases adresinden
    echo 'cloudflared-windows-amd64.exe' dosyasini indirip 'cloudflared.exe' adiyla
    echo bu klasore koyun.
    echo.
    pause
    exit /b 1
)

set "CF_CMD=cloudflared.exe"

:RUN_TUNNEL
echo.
echo [OK] Cloudflare Tunnel baslatiliyor...
echo [BILGI] http://localhost:3000 adresiniz dunyaya guvenli sekilde aciliyor.
echo [BILGI] Konsolda cikan 'https://*.trycloudflare.com' adresini kopyalayabilirsiniz.
echo.
echo Tüneli sonlandırmak için bu pencereyi kapatabilir veya Ctrl+C yapabilirsiniz.
echo ----------------------------------------------------------------
echo.

%CF_CMD% tunnel --url http://localhost:3000

pause
