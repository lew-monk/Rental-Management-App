const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const exp = require("express-jwt");
const createError = require("http-errors");

const JWT = require("jsonwebtoken");
const Property = require("./Controller/Property/PropertyController");
const Property2 = require("./Controller/Property/Property2Controller");
const Listing = require("./Controller/Listing/ListingController");
const { upload } = require("./Controller/Property/Property2Controller");
const { uploadListing } = require("./Controller/Listing/ListingController");

const Business = require("./Controller/Property/BusinessController");
const Admin = require("./Controller/Admin/AdminController");
const passport = require("passport");
const Admin2 = require("./Controller/Admin/AdminController2");

require("./config/passport")(passport);
const {
  verifyToken,
  verifyRefreshToken,
  signAcessToken,
  signRefreshToken,
} = require("./config/JWT_token");

const app = express();
app.set("view engine", "ejs");

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

const url = "mongodb://127.0.0.1:27017";
// dbURL = 'mongodb+srv://Monk:Akiwoiyee21.@cluster0.bdf6h.mongodb.net/Komboa?retryWrites=true&w=majority'

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err.message));

app.get("/home", Property.displayImages);

app.get("/house/:_id", Property.houseDetails);

app.get("/admin", (req, res) => {
  res.render("./Admin/admin");
});

app.get("/admin/login", (req, res) => {
  res.render("./Admin/adminLogin");
});
app.get(
  "/admin/dash",
  passport.authenticate("jwt", { session: false }),
  Admin.dashBoard,
  (req, res) => {
    res.render("./Admin/adminDash");
  }
);

//User Routes
app.post("/register", Admin.image, Admin.registerAdmin);
app.post("/register2", Admin2.registerAdmin2);
app.post("/login", Admin2.adminLogin2);
app.post("/refreshToken", Admin.refreshTokenAdmin);
app.get("/business", Business.allBusinesses);
app.put("/updateAdmin/:id", Admin2.updateAdmin);

//Property Routes
app.post("/admin", Property.houseUploads, Property.addProperty);
app.get("/property/:id", Property2.propertyDetails);
app.post("/add-business", upload, Property2.registerProperty2);
app.put("/editproperty/:id", upload, Property2.editProperty);
app.get("/userproperty/:id", Property2.userProperty);
app.delete("/deleteproperty/:id", Property2.deleteProperty);
app.get("/tests", Property2.test);
app.post("/findproperty", Property2.findProperty);
app.post("/findproperty-name", Property2.findPropertyName);

//Listing Routes

app.post("/:id/addlisting", Listing.uploadListing, Listing.addListing);
app.get("/:id/listing", Listing.getListings);
app.get("/listingdetails/:id", Listing.getDetails);
app.put("/booklisting/:id", Listing.bookListing);
app.delete("/deletelisting/:id", Listing.deleteListing);
app.put("/removebooking/:id", Listing.removeBooking);
app.put("/updatelisting/:id", uploadListing, Listing.updateListing);
app.get("/booked-listings/:id", Listing.getBooked);
app.put("/add-billing-information/:id", Listing.addMonthlyBilling);
app.put("/add-entry-billing-information/:id", Listing.addEntryBilling);
app.get("/billing-information/:id", Listing.getBilling);
app.put("/rent-listing/:id", Listing.rentListing);
app.put("/end-lease/:id", Listing.endLease);
app.put("/add-deposit/:id", Listing.addDeposit);
app.put("/add-installment/:id", Listing.addInstallment);
app.put("/confirm-payment/:id", Listing.confirmPayment);
app.put("/confirm-monthly-bills/:id", Listing.confirmMonthlyPayment);
app.put("/confirm-entry-bill/:id", Listing.confirmEntryPayment);
app.put("/add-entry/:id", Listing.addEntryPayment);
app.put("/add-monthly-installment/:id", Listing.addMonthlyPayment);
