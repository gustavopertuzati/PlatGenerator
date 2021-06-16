const express = require('express');
const bodyParser = require('body-parser');

let app = express();
app.use(express.static('../frontend'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const meals = require('./modules/db.js');

console.log("server response: " + meals.getBestMeals("test@hesge.ch"));

app.post('/', (req, res) => {
    res.json(req.body);
  });

app.listen(8080);
console.log('Server started');