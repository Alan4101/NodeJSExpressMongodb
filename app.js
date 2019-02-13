const express = require('express');
const mongoose =  require('mongoose');

const router = require('./routes');
const config = require('./config');

const app = express();

//use, set
app.set('view engine', 'ejs');

app.use('/api', router.auth);
app.use('/api', router.user);
app.use(express.static(__dirname + '/public'));


app.get('/reg', (req, res)=> res.render('reg'));
app.get('/autorization', (req, res)=> res.render('autorization'));
// app.get('/', (req, res) => res.render());

mongoose.Promise = global.Promise;
mongoose.set('debug', config.IS_PRODUCTION);
mongoose.connection
    .on('error', error => console.log(error))
    .on('close', () => console.log('Database connection closed.'))
    .once('open', () => {
        const info = mongoose.connections[0];
        console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    });
mongoose.connect(config.MONGO_URL,{useNewUrlParser: true});

//catch 404 and forward to error handler
app.use((req, res, next)=>{
    const err = new Error('Not Found');
    err.status= 404;
    next(err);
});

app.listen(config.PORT,()=>{
   console.log(`App listening on port ${config.PORT}!`)
});

