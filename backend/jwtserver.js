const express = require('express');
const jwt = require('jsonwebtoken');
const changeHeaderFunction = require('../frontend/js/HeaderScript');
let app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const users = [{ email: 'admin@test.com', pwd: 'test'} ];
let refreshTokens = [];
const refreshTokenSecret = 'feQ_itHHXkuy4bU_Y6NtJgdJPt0n_rgEOoCkJGe7u_Agl-amMq2FUk6SjVQAv0myhQ';
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

app.post('/api/token' ,(req, res) => {
    const token  = req.body.token;

    if (token == null) return res.sendStatus(401);
    if (!refreshTokens.includes(token)) return res.sendStatus(403);

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({email: user.email}, accessTokenSecret, { expiresIn: '10m' })
        res.json({
            accessToken: accessToken
        });
    });
});

app.delete('/api/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== token);
    res.send("Logout successful");
});

app.post('/api/login', (req,res) => {
    const {email, pwd} = req.body;
    const user = users.find(u => { return u.email === email && u.pwd === pwd });
    console.log(req.body)
    if (user){
        const accessToken = jwt.sign({email: user.email}, accessTokenSecret, { expiresIn: '10m' })
        const refreshToken = jwt.sign({email: user.email}, refreshTokenSecret)
        refreshTokens.push(refreshToken)
        res.json( {accessToken, refreshToken} )
    }else{
        res.send('Email or password incorrect');
    }
});

app.get('/api/posts', authenticateJWT ,(req,res) => {
    /*changeHeaderFunction.changeHeader();
    changement header, liens à faire avec le frontend ici*/
});

app.listen(8081 , (req,res) => {
    console.log('Server started on 8080')
});
