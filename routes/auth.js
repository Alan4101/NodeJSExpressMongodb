const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const jsonParser = express.json();

const models = require('../models');

const salt = bcrypt.genSaltSync(10);


router.post('/registrations', jsonParser, (req, res)=>{
    if(!req.body) return res.sendStatus(400);

    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.ageU;
    const pass = req.body.password;

    const hashPass = bcrypt.hashSync(pass, salt);
    const userA = new models.Register({email: email, firstName: firstName, lastName: lastName, ageU: age, password: hashPass});

    if(!email|| !firstName || !lastName || !age || !pass){
        res.json({
            ok: false,
            error: 'All fields must filled in!',
            fields: ['email', 'firstName ' ,'lastName','age','pass']
        })
    }else if(pass.length<4 || pass.length>12){
        res.json({
            ok: false,
            error: 'Password length is 3 to 12 characters!',
            fields: ['pass']
        });
    }else {
        userA.save((err)=>{
            if(err) return console.log(err);
            res.send(userA)
        })
    }
});
router.post('/auth', (req, res)=>{

    const email = req.body.email;
    const passEnteredByUser= req.body.password;

    models.Register.findOne({email: email})
        .then(user=>{
            if(!user){
                console.log(`User ${user.email} not found`)
            }else if(user.email === email  || bcrypt.hashSync( passEnteredByUser,salt) === user.password){
                res.redirect('/index');
            }else {
                console.log("Some trouble!")
            }
        })
});

module.exports = router;