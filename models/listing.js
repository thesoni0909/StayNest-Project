// requiring mongoose
const mongoose = require('mongoose');

// creating listingSchema
const listingSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    image : {
        type : String,
        default : "https://mismatchedpassports.com/wp-content/uploads/2017/03/peterhof-palace-russia-most-beautiful-palaces-forts-around-the-world.jpg",
        set : function(v){
            return (v==="")?"https://mismatchedpassports.com/wp-content/uploads/2017/03/peterhof-palace-russia-most-beautiful-palaces-forts-around-the-world.jpg":v;
        }
    },
    price : {
        type : Number,
    },
    location : {
        type : String,
    },
    country : {
        type : String
    }
});

// creating model
exports.Listing = mongoose.model("Listing", listingSchema);