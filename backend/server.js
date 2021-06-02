const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

let app = express()
app.use(bodyParser.json());
app.use(express.static('../frontend'))

const users = [{ email: 'admin', pwd: 'test'} ];
const accessTokenSecret = 'wI6inac6mkSD9E-s5oiMNAgm2xaPVfUUax1anGzI0oLArAI4vWIMFkyeZQAZDjIGtQ';
const refreshTokenSecret = 'feaw';
app.post('/login', (req,res) => {
    const {email, pwd} = req.body;
    const user = users.find(u => { return u.email === email && u.pwd === pwd });
    if (user) {
        const accessToken = jwt.sign({ email: user.email } , accessTokenSecret);
        res.json({
            accessToken
        });
    } else {
        res.send('Email or password incorrect');
    }
});

app.post('/logout', (req, res) => {
    const { token } = req.body;
    
});

app.listen(8080);
console.log('Server started')
