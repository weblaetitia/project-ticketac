var express = require('express');
var router = express.Router();

var JourneyModel = require('../models/journeys');
const UserModel = require('../models/users');
const { updateOne } = require('../models/journeys');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('search');
});

/* POST search page */
router.post('/results', async function(req, res, next) {
    console.log(req.body.cityfrom)
    console.log(req.body.cityto)
    console.log(req.body.date)
    var queryIsoDate = new Date(req.body.date);
    console.log(queryIsoDate)

    var journeys = await JourneyModel.find({
        departure: req.body.cityfrom,
        arrival: req.body.cityto,
        date: queryIsoDate
      })    
    if (journeys.length == 0) {
        console.log('vide')
        res.render('notrain')
    } else {
        res.render('results', {journeys:journeys});
    }
  });

/* GET cart page. */
router.get('/cart', async function(req, res, next) {
  var cart = req.session.cart = []
  cart.push({
    departure: req.query.departure,
    arrival: req.query.arrival,
    date: req.query.date,
    departureTime: req.query.departureTime,
    price: req.query.price
  })
  res.render('cart', {cart:cart});
});



/* GET my trips page */
router.get('/mytrips', async function(req, res, next) {
  
});

/* GET no rain page */
router.get('/notrain', function(req, res, next) {
  res.render('notrain');
});




module.exports = router;

