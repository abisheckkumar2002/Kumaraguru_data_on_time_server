const mongoose = require("mongoose");


const inputFieldSchema = mongoose.Schema({

  inputField: {
    type: String,
    required: true,
    default: "",
  },

  status: {
    type: String,
    default: "Active",
  },
  createdate: {
    type: Date,
    default: Date.now,
  },
  
});


const InputField = mongoose.model('inputField', inputFieldSchema);

module.exports  =InputField
