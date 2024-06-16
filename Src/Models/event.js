
const mongoose = require("mongoose");
const {inputDataType,inputField}=require("../enum/enums.js")

const Schema = mongoose.Schema;

// const InputFieldTypeEnum = [
//   "TextBox",
//   "TextEditor",
//   "DatePicker",
//   "CheckBox",
//   "DropDown",
// ];


const eventSchema = mongoose.Schema({
  tittle: {
    type: String,
    default: "",
    required: true,
    unique: true,
  },

  description: {
    type: String,
    default: "",
    required: true,
  },

  eventType_id: {
    type: Schema.Types.ObjectId,
    ref: "EventType",
    required: true,
  },

  eventId: {
    type: String,
    required: true,
    unique: true,
  },

  eventKey: {
    type: [
      {
        key: { type: String },
        isRequired: { type: Boolean, default: false },
       
        inputField: {
          type: String,
          // validate: {
          //   validator: function (v) {
          //     return inputField().includes(v);
          //   },
          //   message: (props) =>
          //     `${props.value} is not a valid input field type!`,
          // },
        },
        inputDataType:{
          type: String,
          // validate: {
          //   validator: function (v) {
          //     return inputDataType().includes(v);
          //   },
          //   message: (props) =>
          //     `${props.value} is not a valid input Data type!`,
          // },
          default:""
        },
      
        option: { type: [String], default:"" },
      
      
      },
    ],

    required: true,
    unique: true,
  },

  addedBy_Id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
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

const Event = mongoose.model("Event", eventSchema);

module.exports = Event
