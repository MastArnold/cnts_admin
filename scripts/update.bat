@echo off
SETLOCAL EnableDelayedExpansion

:: ==========================================
:: CONFIGURATION
:: ==========================================
SET APP_NAME=cnts-angular-app
SET REPO_URL=https://github.com/MastArnold/cnts_admin.git
SET TARGET_DIR=%CD%\cnts-admin
SET PORT=80

echo ========================================
echo   MISE A JOUR AUTOMATISEE : %APP_NAME%
echo ========================================

:: 1. VERIFICATION DES DROITS ADMINISTRATEUR
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERREUR] Ce script doit etre execute en tant qu'ADMINISTRATEUR.
    echo Faites un clic droit sur le fichier et choisissez "Executer en tant qu'administrateur".
    pause
    exit /b 1
)

:: 2. VERIFICATION DE NODE.JS
node -v >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERREUR] Node.js n'est pas installe sur ce serveur.
    echo Veuillez l'installer avant de relancer ce script : https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js detecte.

:: 2. VERIFICATION DE GIT
git -v >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERREUR] Git. n'est pas installe sur ce serveur.
    echo Veuillez l'installer avant de relancer ce script : https://git-scm.com/install/windows
    pause
    exit /b 1
)
echo [OK] Git detecte.

:: 3. MISE A JOUR
echo [1/4] Mise a jour du code source...
if exist "%TARGET_DIR%" (
    cd /d "%TARGET_DIR%"
    git pull
) else (
    echo Le dossier courant n'a aucune configuration git. Veuillez déplacer le fichier update.bat dans le dossier l'application !
    exit /b 1  
) 

:: 4. INSTALLATION ET BUILD (NG 19+)
echo [2/4] Installation des dependances (npm install)...
call npm install --silent
echo [3/4] Build de l'application Angular (Patientez...)...
call npx ng build --configuration production

:: 5. REDEMARRAGE DU SERVICE
echo [4/4] Rédemarrage du service angular
call pm2 restart cnts-angular-app


echo.
echo ======================================================
echo   MISE A JOUR TERMINEE AVEC SUCCES !
echo ======================================================
echo.
echo  Nom du serveur physique : %COMPUTERNAME%
echo  Adresse IP locale       : %IP_LOCALE%
echo.
echo  L'application est accessible via :
echo  1. http://localhost:%PORT% (sur ce serveur)
echo  2. http://%COMPUTERNAME%.local:%PORT% (sur le reseau)
echo  3. http://%IP_LOCALE%:%PORT% (sur le reseau)
echo.
echo ======================================================
pause