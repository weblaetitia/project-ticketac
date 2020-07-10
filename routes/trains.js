var express = require('express');
var router = express.Router();

var JourneyModel = require('../models/journeys')


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

    var journey = await JourneyModel.find({
        departure: req.body.cityfrom,
        arrival: req.body.cityto,
        date: queryIsoDate
      })
    console.log(journey)  
    
    if (journey.length == 0) {
        console.log('vide')
        res.render('notrain')
    } else {
        console.log('pas vide')
        res.render('results', {journey:journey});
    }
  });

/* GET mytickets page. */
router.get('/cart', function(req, res, next) {
  res.render('cart');
});



/* GET my trips page */
router.get('/mytrips', function(req, res, next) {
  res.render('mytrips', { title: 'Express' });
});

/* GET no rain page */
router.get('/notrain', function(req, res, next) {
  res.render('notrain');
});




module.exports = router;

