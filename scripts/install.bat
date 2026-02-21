@echo off
SETLOCAL EnableDelayedExpansion

:: ==========================================
:: CONFIGURATION
:: ==========================================
SET APP_NAME=cnts-angular-app
SET REPO_URL=https://github.com/MastArnold/cnts_admin.git
SET TARGET_DIR=%~dp0cnts-admin
SET PORT=80

echo ========================================
echo   INSTALLATION AUTOMATISEE : %APP_NAME%
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

:: 3. CLONAGE OU MISE A JOUR
if exist "%TARGET_DIR%" (
    echo [1/6] Mise a jour du code source...
    cd /d "%TARGET_DIR%"
    git pull
) else (
    echo [1/6] Clonage du depot...
    git clone %REPO_URL% "%TARGET_DIR%"
    cd /d "%TARGET_DIR%"
)

:: 4. INSTALLATION ET BUILD (NG 19+)
echo [2/6] Installation des dependances (npm install)...
call npm install --silent
echo [3/6] Build de l'application Angular (Patientez...)...
call npx ng build --configuration production

:: 5. CONFIGURATION DE PM2
echo [4/6] Installation des outils de service...
call npm install -g pm2 pm2-windows-startup --silent

:: Definition du chemin exact du build (Verifie bien le nom du dossier dans 'dist')
SET BUILD_PATH=%TARGET_DIR%\dist\cnts_admin\browser

:: 6. LANCEMENT DU SERVICE
echo [5/6] Demarrage du processus PM2...
:: On nettoie l'ancien service s'il existe
call pm2 delete %APP_NAME% >nul 2>&1
call pm2 serve "%BUILD_PATH%" %PORT% --name "%APP_NAME%" --spa

:: 7. FIXATION AU DEMARRAGE WINDOWS
echo [6/6] Configuration de la persistance Windows...
call pm2-startup install
call pm2 save

:: 8. RECUPERATION DE L'ADRESSE IP (pour affichage)
for /f "tokens=4" %%a in ('route print^|findstr 0.0.0.0^|findstr /v "256"') do set IP_LOCALE=%%a

echo.
echo ======================================================
echo   INSTALLATION TERMINEE AVEC SUCCES !
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