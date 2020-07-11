var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// import model User
var UserModel = require('../models/users')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  if (req.session.cart) {
    req.session.cart = ''
  }
  if (req.session.user) {
    req.session.user = ''
  }
});

/* Mytrips page*/ 
router.get('/lasttrips', async function(req,res,next) { 
  if (req.session.user) {
    var userTrips = await UserModel.findById(req.session.user.id)
    res.render('mytrips', {trips:userTrips.trips})
  } else {
    res.redirect('/')
  }
})

  
/* Route Sign-up*/
router.post('/signup', async function(req,res,next){
  // verif que tous les champs sont remplis
  if (req.body.firstname && req.body.name && req.body.email && req.body.password) {
    // ok all inputs are completed
    var searchUser = await UserModel.findOne({
      email: req.body.email
    })
    if (!searchUser){ 
      // if user doesn't exist
      var newUser = new UserModel ({
        firstname: req.body.firstname,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
    var newUserSave = await newUser.save();
    req.session.user = {
      name : newUserSave.name,
      id: newUserSave._id,
    }
    res.redirect('/trains/search');
    } else { 
      // user exist
      res.render('index', {error2: 'User allready exists '});
    }
  } else {
    // Wrong all inputs are not completed
    res.render('index', {error2: 'All fields must be completed'});
  }
})

 /* Route Post Sign In */ 
router.post('/signin',  async function(req,res,next){
  if (req.body.email && req.body.password) {
    // ok all filds ar completed
    var searchUser = await UserModel.findOne({
      email: req.body.email,
      password: req.body.password
      })
    if(searchUser!= null) {
      // if user+password exist
      req.session.user = {
        name : searchUser.name,
        id: searchUser._id
      }
      res.redirect('/search')
    } else {
      // if user+password doesnot exist
      res.render('index', {error: 'Invalid email or password'})
    }
  } else {
    // not all fields are completed
    res.render('index', {error: 'All fields must be completed'})
  }
})

/* GET searchpage */
router.get('/search', function(req, res, next) {
  if (req.session.user)  {
    res.render('search');
  } else {
    res.redirect('/')
  }
});

module.exports = router;