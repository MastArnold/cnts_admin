# Installation de l'application sur windows

## Prérequis
- Installation une version stable (LTS) de **nodejs** [ICI](https://nodejs.org/en/download)
  > Installer le fichier .msi
- Intallation de **git** pour des mise à jour plus simple à faire : [ICI](https://git-scm.com/install/windows)

## Installation
Démarrer l'installation, lancer le fichier **install.bat** en mode administrateur

## Pare feu
Par défaut, windows bloque le port 80. C'est pourtant sur ce port que l'application doit tourner. Si vous n'avez pas encore configurer le parefeu de votre serveur pour autoriser le port 80, veuillez lancer le fichier **grant_port_80.bat** en mode administrateur

## Accessibilité
L'application est disponible sur le serveur par **http://localhost:80** et sur les autres ordinateurs du réseau par **http://ADRESSE_IP:80**. Mais vous pouvez remplacer localhost par le nom du serveur. par exemple, **http://COMPUTER-X1015:80**

## Mise à jour
Si une mise à jour est signalé, vous pouvez simplement lancer le fichier **update.bat**