// requiring mongoose
const mongoose = require('mongoose');

// requiring model "Listing"
const { Listing } = require('../models/listing');

// requiring "data"
const { data } = require('./data');

// establishing connection between mongoDB database
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/StayNest');
}
main()
    .then(() => {
        console.log("Connection with mongoDB is successfull!");
    })
    .catch((err) => {
        console.log(err);
    });

// inserting data
async function insertData(){
    await Listing.insertMany(data);
    console.log("Data was inititalised");
}
insertData();