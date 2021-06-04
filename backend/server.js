const express = require('express');
const jwt = require('jsonwebtoken');
const changeHeaderFunction = require('../frontend/js/HeaderScript');
let app = express();

const accessTokenSecret = 'wI6inac6mkSD9E-s5oiMNAgm2xaPVfUUax1anGzI0oLArAI4vWIMFkyeZQAZDjIGtQ';


app.use(express.json());

app.use(express.static('../frontend'));

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] 
    
    if (token == null)  return res.sendStatus(401)

    jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) return res.sendStatus(403); //forbidden
        req.user = user;
        next();
    });
};

app.get('/api/posts', authenticateJWT ,(req,res) => {
    /*changeHeaderFunction.changeHeader();
    changement header, liens à faire avec le frontend ici*/
});

app.listen(8080 , (req,res) => {
    console.log('Server started on 8080')
});

