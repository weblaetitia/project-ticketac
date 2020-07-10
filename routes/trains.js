var express = require('express');
var router = express.Router();

var JourneyModel = require('../models/journeys');
const UserModel = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('search');
});

/* POST search page */
router.post('/results', async function(req, res, next) {
    var queryIsoDate = new Date(req.body.date);

    var journeys = await JourneyModel.find({
        departure: req.body.cityfrom,
        arrival: req.body.cityto,
        date: queryIsoDate
      })    
    if (journeys.length == 0) {
        // console.log('vide')
        res.render('notrain')
    } else {
        res.render('results', {journeys:journeys});
    }
  });

/* GET cart page. */
router.get('/cart', function(req, res, next) {
  // console.log(req.session.cart)
  if (req.session.cart === undefined) {
    req.session.cart = []
  } 
  req.session.cart.push({
    departure: req.query.departure,
    arrival: req.query.arrival,
    date: req.query.date,
    departureTime: req.query.departuretime,
    price: req.query.price
  })
  res.render('cart', {cart:req.session.cart});
});

/* GET confirm page */
router.get('/confirm', async function(req, res) {
  // console.log(req.session)
  var myUser = await UserModel.findOne({
    _id:req.session.user.id
  }) 

  req.session.cart.forEach(trip => {
    myUser.trips.push({
      departure: trip.departure,
      arrival: trip.arrival,
      date: trip.date,
      departureTime: trip.departuretime,
      price: trip.price
    })
  })
  await myUser.save()

  res.redirect('/')
})

/* GET my trips page */
// router.get('/mytrips', async function(req, res, next) {
  
//   res.render('mytrips');
// });

/* GET no rain page */
router.get('/notrain', function(req, res, next) {
  res.render('notrain');
});




module.exports = router;

