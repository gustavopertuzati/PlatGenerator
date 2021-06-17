const express = require('express');
const bodyParser = require('body-parser');
const meals = require

let app = express();
app.use(express.static('../frontend'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const meals = require('./modules/db.js');

app.listen(8080);
console.log('Server started');

app.get('/api', function(request, response) {
  response.setHeader('Content-Type', 'text/plain');
  response.send(`
  Voici l'API REST CRUD de Gustavo et Thomas exposée par le backend sur /api/
  
  | Verbe HTTP | Endpoint                           | Données                | Description                                                          |
  |:-----------|:-----------------------------------|:-----------------------|:---------------------------------------------------------------------|
  | GET        | topchoice/*:userEmail*/:limit?     |                        | Retourne une liste des plats les mieux notés par l'utilisateur       |
  | POST       | topchoice/                         | userEmail\*, mealUrl\* | Ajoute d'une nouvelle note à une recette                             |
  | PUT        | topChoice/update                   |                        | Modifie des informations de la base de données                       |
  | DELETE     | topChoice/delete/                  | userEmail\*, mealUrl\* | Retire la note d'une blague                                          |
  |:-----------|:-----------------------------------|:-----------------------|:---------------------------------------------------------------------|
  `);
});

/*
* Route récupérant les meilleures recettes
* paramètres: le nombre de recettes affichées
*/
app.get('/api/v1/topChoice/:userEmail/:limit?', (req, res) => {
  if(req.params.userEmail !== undefined) {
    let limit = req.params.limit ? req.params.limit : 5;
  }
});

app.post();

app.put();