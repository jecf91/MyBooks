if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');


//set view engine
app.set('view engine','ejs');
//set where the views are comming from
app.set('views',__dirname + '/views');
//set the layouts folder
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
//Set body parser with urlencoded because we are sending these values to the server through an URL
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));
//Use method-override
app.use(methodOverride('_method'));

//import mongoose
const mongoose = require('mongoose');
//set connection to db
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',error => console.error(error));
db.once('open',()=> console.log('Connected to Mongoose'));

app.use('/',indexRouter);
app.use('/authors', authorRouter);
app.use('/books',bookRouter);

app.listen(process.env.PORT || 3000);