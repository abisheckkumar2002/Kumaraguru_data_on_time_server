const { isEmpty } = require("../../helper/isEmpty");

const db = require("../../Models/index.js");
const { InputFieldTypeEnum } = require("../../Models/event2.js");
const mongoose = require("mongoose");
const Abi = db.abi;
const EventType = db.eventtype;

exports.addEvent = async (req, res, next) => {
  let errors = {};
  const reqBody = req.body;

  if (isEmpty(reqBody.tittle)) {
    errors.tittle = "Title field is required";
  }

  if (isEmpty(reqBody.description)) {
    errors.description = "Description field is required";
  }

  if (isEmpty(reqBody.eventId)) {
    errors.eventId = "Event Id field is required";
  }

  const existingEvent = await Abi.findOne({ eventId: reqBody.eventId });

  if (existingEvent) {
    errors.eventId = "Event Id field already exists";
  }

  const existingTitle = await Abi.findOne({ tittle: reqBody.tittle });
  if (existingTitle) {
    errors.tittle = "Event Title already exists";
  }

  if (!mongoose.Types.ObjectId.isValid(reqBody.eventType_id)) {
    errors.eventType_id = "EventType Id format is invalid";
  } else {
    const eventTypeExists = await EventType.findOne({
      _id: reqBody.eventType_id,
      status: "Active",
    });
    if (!eventTypeExists) {
      errors.eventType_id =
        "EventType Id does not exist in EventType Collection";
    }
  }

  if (!Array.isArray(reqBody.eventkey) || reqBody.eventkey.length === 0) {
    errors.eventkey = "Event Key must be a non-empty array";
  } else {
    reqBody.eventkey.forEach((obj, index) => {
      if (!obj.hasOwnProperty("key") || obj.key.trim() === "") {
        errors[`eventkey[${index + 1}].key`] = "Key field value is required";
      }

      if (
        !obj.hasOwnProperty("inputField") ||
        obj.inputField.trim() === ""
      ) {
        errors[`eventkey[${index + 1}].inputField`] =
          "inputField field value is required";
      } else if (!InputFieldTypeEnum.includes(obj.inputField)) {
        errors[`eventkey[${index + 1}].inputField`] =
          "Enter a valid Enum Type";
      }

      // Validate option only if inputField is present and valid
      if (
        obj.inputField &&
        InputFieldTypeEnum.includes(obj.inputField) &&
        (!Array.isArray(obj.option) || obj.option.length === 0)
      ) {
        errors[`eventkey[${index + 1}].option`] =
          "Option array must be a non-empty array";
      }
    });
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
