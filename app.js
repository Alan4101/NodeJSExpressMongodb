const express = require('express');
const MongodbClient = require('mongodb').MongoClient;
const objId = require('mongodb').ObjectID;

//const database = require('./database');

const app = express();
const jsonParser = express.json();
const url = "mongodb://localhost:27017/";

const mongoClient = new MongodbClient(url, {useNewUrlParser: true});

let dbClient;

app.use(express.static(__dirname + '/public'));

mongoClient.connect((err, client)=>{
   if(err) return console.log(err);
   dbClient = client;
   app.locals.collection = client.db("usersdb").collection('users');

   app.listen(3000, ()=> console.log("Server wait connection..."))
});
//знайти всых
app.get("/api/users", function (req, res){
    const coll = req.app.locals.collection;
    coll.find({}).toArray((err, user)=>{
       if(err) console.log(err);
        res.send(user);
    });

});
//знайти одного юзера
app.get("/api/users/:id", (req, res)=>{
    const id = new objId(req.params.id);
    const coll = req.app.locals.collection;

    coll.findOne({_id: id}, (err, user)=> {
        if(err) console.log(err);
        res.send(user);
    })
});
//створення нового
app.post("/api/users", jsonParser, (req, res)=>{
   if(!req.body) return res.sendStatus(400);

   const userName = req.body.name;
   const userAge = req.body.age;
   const user = {name: userName, age: userAge};

   const coll = req.app.locals.collection;
   coll.insertOne(user,(err, result)=>{
       if(err) console.log(err);
       res.send(user);
   })
});
//видалення
app.delete("/api/users/:id", (req, res)=>{
   const id = new objId(req.params.id);
   const coll = req.app.locals.collection;

   coll.findOneAndDelete({_id: id}, (err, result)=>{
        if(err) console.log(err);
        let user = result.value;
        res.send(user);
   })
});
//редагування корстувача
app.put("/api/users", jsonParser, (req, res)=>{
    if(!req.body) return res.sendStatus(400);

    const id = new objId(req.body.id);
    const userName = req.body.name;
    const userAge = req.body.age;

    const coll = req.app.locals.collection;

    coll.findOneAndUpdate({_id: id}, { $set: {name: userName, age: userAge}},{returnOriginal: false},
        (err, result)=>{
        if(err) return console.log(err);
            const user = result.value;
            console.log(user);
            res.send(user);
    })
});

process.on("SIGINT", ()=>{
   dbClient.close();
   process.exit();
});