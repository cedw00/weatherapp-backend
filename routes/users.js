var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const User = require('../models/users');

const { checkBody } = require('../modules/checkBody');

const OWM_API_KEY = 'ce7418650c86eae6629dfcfdda141c14';

router.post('/signup', (req, res) => {
    if (!checkBody(req.body, ['name', 'email', 'password'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return
    } 
    User.findOne({ email: { $regex: new RegExp(req.body.email, 'i') } }).then(data => {
        if (data === null) {
            newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })
    
            newUser.save();
            res.json({ result: true });
        } else {
            res.json({ result: false, error: 'User already exists' });
        }
    });
    
});

router.post('/signin', (req, res) => {
    if (!checkBody(req.body, ['email', 'password'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }
    User.findOne({ email: { $regex: new RegExp(req.body.email, 'i') } }).then(data => {
        if (data === null) {
            res.json({ result: false, error: 'User not found' });
        } else {
            res.json({ result: true });
        }
    })

});

module.exports = router;
