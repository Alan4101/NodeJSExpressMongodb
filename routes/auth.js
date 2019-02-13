const express = require('express');
const router = express.Router();
const jsonParser = express.json();

const models = require('../models');

router.post('/registrations', jsonParser, (req, res)=>{
    if(!req.body) return res.sendStatus(400);

    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.ageU;
    const pass = req.body.password;

    const userA = new models.Register({email: email, firstName: firstName, lastName: lastName, ageU: age, password: pass});

    userA.save((err)=>{
        if(err) return console.log(err);
        res.send(userA)
    })

});


module.exports = router;