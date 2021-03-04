require("dotenv").config();

const mongoose = require("mongoose");

const crypt = require("crypto");

const bycrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    FullName: {
      type: String,
      lowercase: true,
      required: [true, "Cant be blank"],
      // unique: true,
      // match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
    },

    Image: {
      data: Buffer.from("base64"),
      contentType: String,
    },
    Email: {
      type: String,
      lowercase: true,
      required: [true, "Cant be blank"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    Role: {
      type: String,
    },
    hash: {
      type: String,
      required: true,
    },
    Contact: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

adminSchema.plugin(uniqueValidator);

adminSchema.pre("save", async function (next) {
  try {
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(this.hash, salt);
    this.hash = hashedPassword;
    next();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

adminSchema.methods.isValidPassword = async function (password) {
  try {
    return await bycrypt.compare(password, this.hash);
  } catch (error) {
    throw error;
  }
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
