'use strict';
require('dotenv').config();
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session');
const passport = require('passport');
const { ObjectID } = require('mongodb');


const app = express();

//01 Set up a Template Engine
app.set('view engine', 'pug');
app.set('views', './views/pug');

//03 Set up Passport
//Secrets -> Key: SESSION_SECRET , Value: ****
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

app.use(passport.initialize());
app.use(passport.session());


fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.route('/').get((req, res) => {
    res.render('index', { title: 'Hello', message: 'Please log in' }); //02 Use a Template Engine's Powers
});

//04 Serialization of a User Object
passport.serializeUser((user, done) => {
    done(null, user._id);
});
  
passport.deserializeUser((id, done) => {
    myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
        done(null, null);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});






