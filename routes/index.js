var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');



/* import model User*/
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





/* GET searchpage */
router.get('/search', function(req, res, next) {
  res.render('search');
});

/* GET my trips page */
// router.get('/mytrips', function(req, res, next) {
//   res.render('mytrips');
// });

/* GET no rain page */
router.get('/notrain', function(req, res, next) {
  res.render('notrain');
});


  
/* Route Sign-up*/
router.post('/signup', async function(req,res,next){

  var searchUser = await UserModel.findOne({
    email: req.body.email
  })

if (!searchUser){ 
  var newUser = new UserModel ({

    firstname: req.body.firstname,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
  var newUserSave = await newUser.save();

var newUserSave = await newUser.save();
// console.log(newUserSave);
// console.log(req.session)

req.session.user = {
  name : newUserSave.name,
  id: newUserSave._id,
}
res.redirect('/search');
} else { 

res.render('index');
}
});

 /* Route Post Sign In */ 
router.post('/signin',  async function(req,res,next){

  var searchUser = await UserModel.findOne({
    email: req.body.email,
    password: req.body.password
    })
    
   if(searchUser!= null){
    req.session.user = {
      name : searchUser.name,
      id: searchUser._id,
    }
    res.redirect('/search')
  } else {
     res.render('index')
   }
  })

module.exports = router;