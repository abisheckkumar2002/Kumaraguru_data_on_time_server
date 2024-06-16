const mongoose = require("mongoose");


const eventTypeSchema = mongoose.Schema({
  eventtype: {
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


const EventType = mongoose.model('EventType', eventTypeSchema);

module.exports  =EventType
