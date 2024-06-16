const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const eventDataSchema = mongoose.Schema({

 
  
    event_Id: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    eventData:{
        type: Schema.Types.Array,
        required:true
    
    },
  
    addedBy_Id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    recordFile:{
      type: String,
      required: true,
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
  
  const EventData = mongoose.model("EventData", eventDataSchema);
  
  module.exports = EventData