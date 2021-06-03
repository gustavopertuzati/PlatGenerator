require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const users = [{ email: 'admin', pwd: 'test'} ];
const accessTokenSecret = 'wI6inac6mkSD9E-s5oiMNAgm2xaPVfUUax1anGzI0oLArAI4vWIMFkyeZQAZDjIGtQ';
const refreshTokenSecret = 'feQ_itHHXkuy4bU_Y6NtJgdJPt0n_rgEOoCkJGe7u_Agl-amMq2FUk6SjVQAv0myhQ';
const refreshTokens = [];

app.post('/token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });

        res.json({
            accessToken
        });
    });

})

app.post('/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(token => t !== token);

    res.send("Logout successful");
});

app.post('/login', (req,res) => {
    const {email, pwd} = req.body;
    const user = users.find(u => { return u.email === email && u.pwd === pwd });
    if (user) {
        const accessToken = jwt.sign({ email: user.email } , accessTokenSecret, { expiresIn: '20m' });
        const refreshToken = jwt.sign({ email: user.email }, refreshTokenSecret);
        refreshTokens.push(refreshToken)
        res.json({
            accessToken,
            refreshToken
        });
    } else {
        res.send('Email or password incorrect');
    }
});


app.listen(3000)