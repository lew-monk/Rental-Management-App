const { response } = require("express");
const mongoose = require("mongoose");
const Admin = require("../Admin/AdminModel");
const Business = require("./BusinessModel");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  Images: {
    data: Buffer.from("base64"),
    contentType: String,
  },
});

const propertySchema = new Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Admin,
    },
    propertyName: {
      type: String,
      // required: [true, 'Cant Be Blank'],
    },
    propertyDescription: {
      type: String,
      // required: [true, 'Cant Be Blank'],
    },
    propertyType: {
      type: String,
      // required: [true, 'Cant Be Blank'],
    },
    propertyStatus: {
      type: String,
      // required: [true, 'Cant Be Blank'],
    },
    propertyLocation: {
      lat: Number,
      lng: Number,
    },

    floors: {
      type: String,
      // required: [true, 'Cant Be Blank'],
    },
    propertyGallery: [],
    propertyVideo: String,
    propertyFeatures: [],
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
const Image = mongoose.model("Image", imageSchema);

module.exports = { Property, Image };
