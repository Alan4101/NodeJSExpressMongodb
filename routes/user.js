const express = require('express');
const router = express.Router();
const jsonParser = express.json();

const models = require('../models');

router.get('/users/', (req, res)=>{
    models.User.find({},(err, users)=>{
        if(err) return console.log(err);
        res.send(users);
    })
});
router.get('/users/:id', (req, res)=>{
    const id = req.params.id;
    models.User.findOne({_id: id}, (err, user)=>{
        if(err) return console.log(err);
        res.send(user)
    })
});
router.post('/users', jsonParser, (req, res)=>{
    if(!req.body) return res.sendStatus(400);

    const userName = req.body.name;
    const userAge = req.body.age;
    const user = new models.User({name: userName, age: userAge});

    user.save((err)=>{
        if(err) return console.log(err);
        res.send(user);
        console.log(user);
    })
});
router.delete('/users/:id', (req, res)=>{
    const id = req.params.id;
    models.User.findByIdAndDelete(id, (err, user)=>{
        if(err) return console.log(err);
        res.send(user);
    })
});
router.put('/users', jsonParser, (req, res)=>{
    if(!req.body) return res.sendStatus(400);

    const id = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
    const newUser = models.User({_id: id, name: userName, age: userAge});

    models.User.findOneAndUpdate({_id: id}, newUser, {new: true}, (err, user)=>{
        if(err) return console.log(err);
        res.send(user);
    })
});
module.exports = router;