const { isEmpty } = require("../../helper/isEmpty");

const db = require("../../Models/index.js");

const mongoose = require("mongoose");
const EventData = db.eventData;
const Event = db.event;

function isAlphanumeric(str) {
  // Regular expression to match only alphanumeric characters
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(str);
}

function isNumeric(str) {
  // Regular expression to match only numeric characters
  const numericRegex = /^[0-9]+$/;
  return numericRegex.test(str);
}

exports.addEvent = async (req, res, next) => {
  let errors = {};
  const reqBody = req.body;
  console.log(
    req.file,
    "eventDataArrayeventDataArrayeventDataArrayeventDataArrayeventDataArray"
  );
  const eventDataArray = JSON.parse(reqBody.eventData);

  if (req && !req.file) {
    errors.recordFile = " Record Pdf File is required";
  }
  eventDataArray.forEach((field, index) => {
    if (field.isRequired) {
      if (isEmpty(field[field.key])) {
        errors[field.key] = `${field.key} is required.`;
      }

      if (field.inputDataType === "AlpahaNumeric") {
        if (
          !isAlphanumeric(field[field.key]) &&
          field[field.key].trim() !== ""
        ) {
          errors[
            field.key
          ] = `${field.key} must contain only alphanumeric characters.`;
        }
      }

      if (field.inputDataType === "Number") {
        if (!isNumeric(field[field.key]) && field[field.key].trim() !== "") {
          errors[field.key] = `${field.key} must contain only numbers.`;
        }
      }
    }
  });

  console.log("errors:", errors);

  if (!mongoose.Types.ObjectId.isValid(reqBody.event_Id)) {
    errors.event_Id = "Event Id format is invalid";
  } else {
    const eventExists = await Event.findOne({
      _id: reqBody.event_Id,
      status: "Active",
    });

    if (!eventExists) {
      errors.event_Id = "EventType Id does not exist in EventType Collection";
    }
  }

  //   if(reqBody.eventData && reqBody.eventData.length > 0){
  //     errors.eventData = "eventData must have the key";
  //   }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};









exports.updateEvent = async (req, res, next) => {
  let errors = {};
  const reqBody = req.body;
  console.log(
    req.file,
    "eventDataArrayeventDataArrayeventDataArrayeventDataArrayeventDataArray"
  );
  const eventDataArray = JSON.parse(reqBody.eventData);


  eventDataArray.forEach((field, index) => {
    if (field.isRequired) {
      if (isEmpty(field[field.key])) {
        errors[field.key] = `${field.key} is required.`;
      }

      if (field.inputDataType === "AlpahaNumeric") {
        if (
          !isAlphanumeric(field[field.key]) &&
          field[field.key].trim() !== ""
        ) {
          errors[
            field.key
          ] = `${field.key} must contain only alphanumeric characters.`;
        }
      }

      if (field.inputDataType === "Number") {
        if (!isNumeric(field[field.key]) && field[field.key].trim() !== "") {
          errors[field.key] = `${field.key} must contain only numbers.`;
        }
      }
    }
  });



 

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
