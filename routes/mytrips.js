var express = require('express');
var router = express.Router();

var JourneyModel = require('../models/journeys');
const UserModel = require('../models/users');
const { updateOne } = require('../models/journeys');


/* Mytrips page*/ 

router.post('/lasttrips', function(req,res,next) { 

// var trips = await UserModel.findById('req.session.user.id')

//     console.log(trips)

  


console.log(req.session.user)
res.render('lasttrips');

})