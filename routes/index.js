var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/available', function(req, res, next) {
  res.render('available');
});

/* GET mytickets page. */
router.get('/cart', function(req, res, next) {
  res.render('cart');
});

/* GET homepage */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

/* GET no rain page */
router.get('/notrain', function(req, res, next) {
  res.render('notrain');
});



module.exports = router;

