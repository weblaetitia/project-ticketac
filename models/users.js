var mongoose = require('mongoose');

 /* Schéma trips*/ 
 var TripsSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    departureTime: String,
    price: Number
})

/* Schéma users */
var userSchema = mongoose.Schema({
    firstname: String,
    name: String,
    email: String,
    password: String,
    trips: [TripsSchema]
})


/* Models*/ 

var UserModel = mongoose.model('users', userSchema);

module.exports = UserModel; 


