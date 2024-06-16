const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dbConfig = require("../Config/config.js");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  UserId: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        // Regular expression for validating email addresses
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },

  password: {
    type: String,

    default: "",
    // Adding a custom setter to encrypt the password before saving
    set: function (password) {
      // Generate a salt
      const salt = bcrypt.genSaltSync(10);
      // Hash the password with the salt
      const hashedPassword = bcrypt.hashSync(password, salt);
      // Return the hashed password
      return hashedPassword;
    },
  },

  conform_password: {
    type: String,

    default: "",
    // Adding a custom setter to encrypt the password before saving
    set: function (conform_password) {
      // Generate a salt
      const salt = bcrypt.genSaltSync(10);
      // Hash the password with the salt
      const hashedConformPassword = bcrypt.hashSync(conform_password, salt);
      // Return the hashed password
      return hashedConformPassword;
    },
  },

  mobile: {
    type: Number,
    default: "",
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid 10-digit number!`,
    },
  },

  type_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "UserType",
  },

  dep_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Department",
  },

  addedBy_Id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

 
  eventType_id: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "EventType",
  },
 
  typeList_id: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "UserType",
    required: true
  },

  status: {
    type: String,
    default: "Active",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateJWT = function (payload) {
  let token = jwt.sign(payload, dbConfig.secretOrKey);
  return `Bearer ${token}`;
};

const User = mongoose.model("User", userSchema);



module.exports = User;
