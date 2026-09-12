// requiring express
const express = require('express');
const app = express();

// requiring mongoose
const mongoose = require('mongoose');

// requiring model "Listing"
const { Listing } = require('./models/listing');

// requiring path
const path = require('path');

// set template engine "ejs"
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// serving static files
app.use(express.static(path.join(__dirname,"/public")));

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

// testing-route
app.get("/testing",(req, res) => {
    new Listing({
        title : "Apartment",
        description : "Beautiful scene outside apartment",
        price : 1200,
        location : "Goa",
        country : "India"
    }).save().then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    res.send("Successfully Saved");
});

// home route
app.get("/listings", async (req, res) => {
    const AllListings = await Listing.find();
    res.render("Listings/home.ejs", { AllListings });
});

// show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("Listings/show.ejs", { listing });
});

// starting express server
app.listen(3000, () => {
    console.log("Server has started on port 3000");
});