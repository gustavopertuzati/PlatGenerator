## Description du projet

Ce projet est une application Web permettant à l'utilisateur de générer de manière catégorisé des plats, de voter pour ses combinaisons et de consulter les combinaisons les plus appréciées par la communauté (cette dernière partie appartient au backend qui n'est pas implémenté).

### Réccupérer le projet

le projet est disponible sur l'hébergement Git (gitedu.hesge.ch).

Cloner le projet localement avec la commande git suivante:

- **ssh**: `git clone ssh://git@ssh.hesge.ch:10572/hoanhduc.nguyen/app-et-archi-web-tp-2020.git`
- **https**: `git clone https://gitedu.hesge.ch/hoanhduc.nguyen/app-et-archi-web-tp-2020.git`

### Structure

Le projet contient 2 dossiers:

- **frontend**: contient le site public:
    - **css**: contient un élément css
    - **fig**: contient les figures nécessaires pour le css et html
    - **html**: contient les pages htmls du site
    - **js**: contient les scripts js pour l'utilisation des APIs publics et les animations du sites

- **backend**: contient le serveur Node

### Démarrer le serveur

La partie publique est servie par le serveur sur Node. Vous devez avoir Node installé sur votre machine pour démarrer cette application Web.

Accédez au dossier contenant le serveur Node

`cd backend/`

Installez les dépendances

`npm install`

Démarrez le serveur Node

`node server.js`

Vous pouvez ensuite visualiser le site en local sur un navigateur: **localhost:8080**

IMPORTANT: Certains navigateurs, tel que Chrome | Firefox, requiert l'installation d'une extension pour autoriser CORS.
(pour Chrome: https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)

### Stopper le server

Pour stopper le serveur Node, utilisez la commande **CTRL + C**

### Architecture du projet

              +------------+               +------------+     
              |            |               |            |
              |            |               |            |
              |  Frontend  +---------------|2 API PUBLIC|
              |            |               |            |  
              |            |               |            |
              +------------+               +------------+

- Frontend: Projet HTML5, CSS3, JS
- RECIPE PUPPY: API Rest public pour réccupérer des recettes (http://www.recipepuppy.com/api/)

### Fonctionnalités
- génère aléatoirement les recettes et catégorise ou pas la génération.

### Inspiration du design du site
- https://html5up.net/spectral

### Contact

#### Auteurs

- Identifiant: @hoanhduc.nguyen
- Mail: hoanh-duc-trung.nguyen@etu.hesge.ch

- Identifiant: @gustavo.pertuzat
- Mail: gustavo.pertuzati@etu.hesge.ch

#### Assistant

- Identifiant: @michael.minelli
- Mail: michael-jean.minelli@hesge.ch

#### Professeur d'Applications Web

- Identifiant: @jeremy.gobet
- Mail: jeremy.gobet@hesge.ch

#### Professeur d'Architectures Web

- Identifiant: @stephane.malandai
- Mail: stephane.malandain@hesge.ch
