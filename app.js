const express = require('express');
const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const url = "mongodb://localhost:27017/usersdb";
const userSchema = new Schema({
    name: String,
    age: Number},
    { versionKey: false});

const userAuthSchema = new Schema({
        email: {
            type: String
        },
        firstName: String,
        lastName: String,
        ageU: Number,
        password: String
    },
    {versionKey: false});

const User = mongoose.model('User', userSchema);
const Registration = mongoose.model('Registration', userAuthSchema);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/reg', (req, res)=> res.render('reg'));
app.get('/autorization', (req, res)=> res.render('autorization'));
// app.get('/', (req, res) => res.render());

mongoose.connect(url, {useNewUrlParser: true }, (err)=>{
    if(err) return console.log(err);

    app.listen(3000, ()=> console.log('Server wait connection..'));
});
app.post('/api/registrations', jsonParser, (req, res)=>{
    if(!req.body) return res.sendStatus(400);

    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.ageU;
    const pass = req.body.password;

    const userA = new Registration({email: email, firstName: firstName, lastName: lastName, ageU: age, password: pass});
    userA.save((err)=>{
        if(err) return console.log(err);
        res.send(userA)
    })

});
app.get('/api/registration', (req, res)=>{
   UserAth.find({}, (err, users)=>{
       if(err) return console.log(err);
       res.send(users);
       console.log(users);
   })
});



app.get('/api/users/', (req, res)=>{
   User.find({},(err, users)=>{
       if(err) return console.log(err);
       res.send(users);
   })
});
app.get('/api/users/:id', (req, res)=>{
   const id = req.params.id;
    User.findOne({_id: id}, (err, user)=>{
        if(err) return console.log(err);
        res.send(user)
    })
});
app.post('/api/users', jsonParser, (req, res)=>{
   if(!req.body) return res.sendStatus(400);

   const userName = req.body.name;
   const userAge = req.body.age;
   const user = new User({name: userName, age: userAge});

    user.save((err)=>{
       if(err) return console.log(err);
       res.send(user)
        console.log(user);
    })
});
app.delete('/api/users/:id', (req, res)=>{
   const id = req.params.id;
   User.findByIdAndDelete(id, (err, user)=>{
       if(err) return console.log(err);
       res.send(user);
   })
});
app.put('/api/users', jsonParser, (req, res)=>{
   if(!req.body) return res.sendStatus(400);

   const id = req.body.id;
   const userName = req.body.name;
   const userAge = req.body.age;
   const newUser = User({_id: id, name: userName, age: userAge});

   User.findOneAndUpdate({_id: id}, newUser, {new: true}, (err, user)=>{
       if(err) return console.log(err);
       res.send(user);
   })
});

