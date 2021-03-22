const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    listingDescription: String,
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    listingType: String,
    listingStatus: String,
    listingBedrooms: String,
    listingBathrooms: String,
    listingFloors: String,
    listingArea: Number,
    listingSize: Number,
    listingPrice: Number,
    listingVideo: String,
    listingFeatures: [],
    listingGallery: [],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
    rentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    buying: {
      deposit: {
        amount: Number,
        refNo: String,
        confirmation: String,
        paidAt: { type: Date, default: Date.now },
      },
      installments: [
        {
          amount: Number,
          refNo: String,
          paidAt: { type: Date, default: Date.now },
          confirmation: String,
        },
      ],
    },
    paidBills: {
      entry: {
        total: Number,
        refNo: String,
        paidAt: { type: Date, default: Date.now },
        confirmation: String,
      },
      monthly: [
        {
          rent: Number,
          water: Number,
          electricity: Number,
          paidAt: { type: Date, default: Date.now },
          confirmation: String,
          refNo: String,
        },
      ],
    },
    billing: {
      monthly: {
        rent: Number,
        water: Number,
        electricity: Number,
      },
      entry: {
        rent: Number,
        deposit: Number,
        water: Number,
        electricity: Number,
        other: Number,
      },
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = { Listing };
