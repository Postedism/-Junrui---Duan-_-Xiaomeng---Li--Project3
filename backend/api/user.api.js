import express from 'express';
import * as UserModel from './db/model/user.model.js';
import cookieParser from 'cookie-parser';

const router = express.Router();


const cookieOptions = {
    httpOnly: true, 
    sameSite: 'strict',
};


router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.createUser({ username, password });
        
        res.cookie('username', username, cookieOptions);
        res.send("User created and logged in");
    } catch (e) {
        res.status(400).send("Username already exists or error");
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findUserByUsername(username);
        if (!user || user.password !== password) {
            return res.status(401).send("Invalid credentials");
        }
        
        res.cookie('username', username, cookieOptions);
        res.send("Logged in");
    } catch (e) {
        res.status(500).send("Server error");
    }
});


router.post('/logout', (req, res) => {
    res.clearCookie('username');
    res.send("Logged out");
});


router.get('/isLoggedIn', (req, res) => {
    const username = req.cookies.username;
    if (username) {
        res.send({ username: username });
    } else {
        res.status(401).send("Not logged in");
    }
});

export default router;