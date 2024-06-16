const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InputFieldTypeEnum = [
  "TextBox",
  "TextEditor",
  "DatePicker",
  "CheckBox",
  "DropDown",
];


const abiSchema = mongoose.Schema({
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
        isMultiple: { type: Boolean, default: false },
        option: { type: [String], default: [] },
        inputField: {
          type: String,
          validate: {
            validator: function (v) {
              return InputFieldTypeEnum.includes(v);
            },
            message: (props) =>
              `${props.value} is not a valid input field type!`,
          },
        },
      
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

const Abi = mongoose.model("Abi", abiSchema);

module.exports = Abi
