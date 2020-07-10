var mongoose = require('mongoose');



/* Schéma users */
var userSchema = mongoose.Schema({
    firstname: String,
    name: String,
    email: String,
    password: String,
})
 /* Schéma trips*/ 
var trips = mongoose.Schema({
    date: Date,
    journey: String,
    departure_time: Number,
    price: Number
})

/* Models*/ 

var UserModel = mongoose.model('users', userSchema);

module.exports = UserModel; 


