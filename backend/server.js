const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


const accessTokenSecret = 'wI6inac6mkSD9E-s5oiMNAgm2xaPVfUUax1anGzI0oLArAI4vWIMFkyeZQAZDjIGtQ';

let app = express()
app.use(bodyParser.json());
app.use(express.static('../frontend'))

app.get('/authentification', authenticateJWT, (req, res) => {

});

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
};

app.listen(8080);
console.log('Server started')
