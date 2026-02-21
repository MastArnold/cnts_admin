:: OUVERTURE DU PORT DANS LE PARE-FEU (FIREWALL)
echo ====================================
echo CONFIGURATION DU PAREFEU WINDOWS
echo ====================================

:: VERIFICATION DES DROITS ADMINISTRATEUR
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERREUR] Ce script doit etre execute en tant qu'ADMINISTRATEUR.
    echo Faites un clic droit sur le fichier et choisissez "Executer en tant qu'administrateur".
    pause
    exit /b 1
)

echo.
echo.
echo Autorisation du port 80...
powershell -Command "if (!(Get-NetFirewallRule -DisplayName 'Angular App Port %PORT%' -ErrorAction SilentlyContinue)) { New-NetFirewallRule -DisplayName 'Angular App Port %PORT%' -Direction Inbound -LocalPort %PORT% -Protocol TCP -Action Allow -Description 'Autorise le trafic pour l'application Angular' }"
echo.
echo.
echo Configuration terminé avec succès !
pause