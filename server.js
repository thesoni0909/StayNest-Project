// requiring express
const express = require('express');
const app = express();

// requiring mongoose
const mongoose = require('mongoose');

// requiring model "Listing"
const { Listing } = require('./models/listing');

// requiring methodOverride
const methodOverride = require('method-override');
app.use(methodOverride("_method"));

// requiring path
const path = require('path');

// set template engine "ejs"
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// serving static files
app.use(express.static(path.join(__dirname,"/public")));

// parsing form data
app.use(express.urlencoded({extended : true}));

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

// create route
app.get("/listings/new", (req, res) => {
    res.render("Listings/create.ejs");
});

app.post("/listings", async (req, res) => {
    await new Listing(req.body).save();
    res.redirect("/listings");
});

// update route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("Listings/update.ejs", { listing });
});

app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    console.log(req.body);
    await Listing.findByIdAndUpdate(id, req.body);
    res.redirect(`/listings/${id}`);
});

// delete route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
})

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