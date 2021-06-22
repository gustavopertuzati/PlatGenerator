const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
const db = require('./modules/db')

let app = express();
app.use(express.static('../frontend'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//const meals = require('./modules/db.js');

app.listen(8080);
console.log('Server started');

app.get('/api', function(req, res) {
  response.setHeader('Content-Type', 'text/plain');
  response.send(`
  Voici l'API REST CRUD de Gustavo et Trung exposée par le backend sur /api/v1/
  
  | Verbe HTTP | Endpoint                           | Données                | Description                                                          |
  |:-----------|:-----------------------------------|:-----------------------|:---------------------------------------------------------------------|
  | GET        | topchoice/*:userEmail*/:limit?     |                        | Retourne une liste des plats les mieux notés par l'utilisateur       |
  | POST       | topchoice/                         | userEmail\*, mealUrl\* | Ajoute d'une nouvelle note à une recette                             |
  | PUT        | topChoice/update                   |                        | Modifie des informations de la base de données -> modifie une note   |
  | DELETE     | topChoice/delete/                  | userEmail\*, mealUrl\* | Retire la note d'une blague                                          |
  |:-----------|:-----------------------------------|:-----------------------|:---------------------------------------------------------------------|
  `);
});

/*
* Route récupérant les meilleures recettes
* paramètres: le mail de l'utilisateur, le nombre de recettes affichées
*/
app.get('/api/v1/topChoice/get/:userEmail/:limit?', (req, res) => {
  if(req.params.userEmail !== undefined) {
    let limit = req.params.limit ? req.params.limit : 5;
    res.status(200).json(db.getFavoriteMeals(req.params.userEmail, limit));
  }else{
    res.status(400).end();
  }
});

/*
* Route permettant à l'utilisateur de liker une recette
* paramètres: 
*/
app.post('/api/v1/topChoice/post/', (req, res) => {
  if(req.body.userEmail !== undefined && req.body.href !== undefined && req.body.note !== undefined){
    if(!db.postLikedMeal(req.body.userEmail, req.body.href, req.body.note)){
      res.status(204).end();
      return;
    }
    res.status(200).end();
  }else{
    res.status(400).end();
  }
});

app.put('/api/v1/topChoice/put/', (req, res) => {
  
  if(req.body.userEmail !== undefined && req.body.href !== undefined && req.body.note !== undefined) {
    if (!db.putLikedMeal(req.body.userEmail, req.body.href, req.body.note)){
      res.status(204).end();
      return;
    }
    res.status(200).end();
  }else{
    res.status(400).end();
  }
});

app.delete('/api/v1/topChoice/delete', (req, res) => {
  if(req.body.userEmail !== undefined && req.body.href !== undefined) {
    if (!db.deleteLikedMeal(req.body.userEmail, req.body.href)){
      res.status(204).end();
      return;
    }
    res.status(200).end();
  }else{
    res.status(400).end();
  }
});
