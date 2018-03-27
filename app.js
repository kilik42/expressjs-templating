var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var app = express();



//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//middleware
// var logger = function(req, res,next){
//   console.log('logging....');
//   next();
// }



//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set up line of middleware for public resources(images, scripts,etc)
app.use(express.static(path.join(__dirname, 'public')));

//gloval vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});
// var people = [
//   {
//   name: 'james',
//   age: 30
//    },
//    {
//    name: 'sarah',
//    age: 90
//     },
//     {
//     name: 'neil',
//     age: 45
//      },
//
// ]


//express middleware validator
app.use(expressValidator());﻿


var users = [
  {
    id: 1,
    first_name : 'john',
    last_name: 'Doe',
    email: 'johndoe@gamil.com'
  },
  {
    id: 2,
    first_name : 'jack',
    last_name: 'mar',
    email: 'jackmar@gamil.com'
  },
  {
    id: 3,
    first_name : 'jill',
    last_name: 'Dadd',
    email: 'jillDadd@gamil.com'
  }
]

app.get('/', function(req, res){
  //res.send('hello world');
  res.render('index', {
    title: 'Customers',
    users: users
  });
});

app.post('/users/add', function(req, res){
    //console.log('form submitted')
    //console.log(req.body.first_name);
    req.checkBody('first_name', 'First name is required').notEmpty();
    req.checkBody('last_name', 'Last name is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();

    var errors = req.validationErrors();
    if(errors){
          res.render('index', {
              title: 'Customers',
              users: users,
              errors: errors
          });
    }else{
      var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
      }
      console.log('success');
    }


    console.log(newUser);
});

app.listen(3000, function(){
  console.log('server started on port 3000');

});
