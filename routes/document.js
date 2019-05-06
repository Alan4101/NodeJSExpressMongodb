const express = require('express');
const router = express.Router();
const jsonParser = express.json();

const models = require('../models');

router.get('/docs/', (req, res)=>{
    models.Doc.find({},(err, docs)=>{
        if(err) return console.log(err);
        res.send(docs);
    })
});
router.get('/docs/:id', (req, res)=>{
    const id = req.params.id;
    models.Doc.findOne({_id: id}, (err, doc)=>{
        if(err) return console.log(err);
        res.send(doc)
    })
});
router.post('/docs', jsonParser, (req, res)=>{
    if(!req.body) return res.sendStatus(400);

    const siteName = req.body.name;
    const siteLogin = req.body.login;
    const sitePass = req.body.pass;
    const user = new models.Doc({name: siteName, login: siteLogin, pass: sitePass});

    user.save((err)=>{
        if(err) return console.log(err);
        res.send(doc);
    })
});
router.delete('/docs/:id', (req, res)=>{
    const id = req.params.id;
    models.Doc.findByIdAndDelete(id, (err, doc)=>{
        if(err) return console.log(err);
        res.send(doc);
    })
});
router.put('/docs', jsonParser, (req, res)=>{
    if(!req.body) return res.sendStatus(400);

    const id = req.body.id;
    const siteName = req.body.name;
    const siteLogin = req.body.login;
    const sitePass = req.body.pass;
    const newDoc = models.Doc({_id: id, name: siteName, login: siteLogin, pass: sitePass});

    models.Doc.findOneAndUpdate({_id: id}, newDoc, {new: true}, (err, doc)=>{
        if(err) return console.log(err);
        res.send(doc);
    })
});
module.exports = router;