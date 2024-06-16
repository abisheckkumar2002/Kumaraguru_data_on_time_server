const mongoose = require("mongoose");


const inputTypeSchema = mongoose.Schema({

  inputType: {
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


const InputType = mongoose.model('inputType', inputTypeSchema);

module.exports  =InputType
