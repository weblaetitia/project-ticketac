var mongoose = require('mongoose')

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://ticketacLL:1eLnGfhtj1lRhvzu@lacapsulecluster.hr8zs.azure.mongodb.net/Ticketac?retryWrites=true&w=majority',
    options,
    function(err){
        console.log(err);
    }
)

module.exports = mongoose


