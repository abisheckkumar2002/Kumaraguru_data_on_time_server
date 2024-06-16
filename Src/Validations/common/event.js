const { isEmpty } = require("../../helper/isEmpty");
const { inputField, inputDataType } = require("../../enum/enums.js");
const db = require("../../Models/index.js");

const mongoose = require("mongoose");
const Event = db.event;
const EventType = db.eventtype;

const optionRequired = ["CheckBox", "DropDown"];
const dataTypeRequired = ["TextBox", "TextEditor", "DatePicker"];

exports.addEvent = async (req, res, next) => {
  let errors = {};
  const reqBody = req.body;

  if (isEmpty(reqBody.tittle)) {
    errors.tittle = "Tittle field is required";
  }

  if (isEmpty(reqBody.description)) {
    errors.description = "Description field is required";
  }

  if (isEmpty(reqBody.eventId)) {
    errors.eventId = "Event Id field is required";
  }

  const existingEvent = await Event.findOne({ eventId: reqBody.eventId });

  if (existingEvent) {
    errors.eventId = "Event Id field already exists";
  }

  const existingTittle = await Event.findOne({ tittle: reqBody.tittle });
  if (existingTittle) {
    errors.tittle = "Event Tittle already exists";
  }

  if (!mongoose.Types.ObjectId.isValid(reqBody.eventType_id)) {
    errors.eventType_id = "Select Event Type Id";
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

  if (!Array.isArray(reqBody.eventKey) || reqBody.eventKey.length === 0) {
    errors.eventKey = "Event Key must be a non-empty Key";
  } else {
    reqBody.eventKey.forEach((obj, index) => {
      if (!obj.hasOwnProperty("key") || obj.key.trim() === "") {
        errors[`eventKey[${index + 1}].key`] = "Label field value is required";
      }

      if (obj.hasOwnProperty("isRequired")) {

        if (typeof obj.isRequired !== "boolean") {
          errors[`eventKey[${index + 1}].isRequired`] =
            "isRequired field value must be a boolean";
        }
      } else {
        errors[`eventKey[${index + 1}].isRequired`] =
          "isRequired field is required";
      }

      if (obj.hasOwnProperty("inputField")) {
       
        if (!inputField().includes(obj.inputField)) {

          errors[`eventKey[${index + 1}].inputField`] =
            " Select InputField field ";
        }
      } else {
        errors[`eventKey[${index + 1}].inputField`] =
          "inputField field is required";
      }
       
      if(obj.isRequired && obj.inputField==="TextBox"){

        if (obj.hasOwnProperty("inputDataType")) {
          if (!inputDataType().includes(obj.inputDataType)) {
            errors[`eventKey[${index + 1}].inputDataType`] =
              "Select InputData Type";
          }
        } else {
          errors[`eventKey[${index + 1}].inputDataType`] =
            "inputDataType field  is required";
        }


      }
     

      if (optionRequired.includes(obj.inputField)) {
        if (obj.hasOwnProperty("option")) {
          if (obj.option.trim() === "") {
            errors[`eventKey[${index + 1}].option`] =
              "option field must have one choice";
          }
        }
         else {
          errors[`eventKey[${index + 1}].option`] =
            "option field value is required";
        }

      }
     
    });
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};












exports.updateEvent = async (req, res, next) => {
  let errors = {};
  const reqBody = req.body;

  if (isEmpty(reqBody.tittle)) {
    errors.tittle = "Tittle field is required";
  }

  if (isEmpty(reqBody.description)) {
    errors.description = "Description field is required";
  }

  if (isEmpty(reqBody.eventId)) {
    errors.eventId = "Event Id field is required";
  }

  const existingEvent = await Event.findOne({ eventId: reqBody.eventId });

  
  const updateEvent = await Event.findOne({
    _id: new mongoose.Types.ObjectId(req.params.id),
  });


  const existingEventId = await Event.findOne({
    _id: { $ne: updateEvent._id },
    eventId: reqBody.eventId,
  });


  if (existingEventId) {
    errors.eventId = "Event Id field already exists";
  }

  const existingEventTittle = await Event.findOne({
    _id: { $ne: updateEvent._id },
    eventId: reqBody.tittle,
  });

  if (existingEventTittle) {
    errors.eventId = "Event Tittle field already exists";
  }



  if (!mongoose.Types.ObjectId.isValid(reqBody.eventType_id)) {
    errors.eventType_id = "Select Event Type Id";
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

  if(reqBody.eventKey){


    if (!Array.isArray(reqBody.eventKey) || reqBody.eventKey.length === 0) {
      errors.eventKey = "Event Key must be a non-empty Key";
    } else {
      reqBody.eventKey.forEach((obj, index) => {
        if (!obj.hasOwnProperty("key") || obj.key.trim() === "") {
          errors[`eventKey[${index + 1}].key`] = "Label field value is required";
        }
  
        if (obj.hasOwnProperty("isRequired")) {
  
          if (typeof obj.isRequired !== "boolean") {
            errors[`eventKey[${index + 1}].isRequired`] =
              "isRequired field value must be a boolean";
          }
        } else {
          errors[`eventKey[${index + 1}].isRequired`] =
            "isRequired field is required";
        }
  
        if (obj.hasOwnProperty("inputField")) {
         
          if (!inputField().includes(obj.inputField)) {
  
            errors[`eventKey[${index + 1}].inputField`] =
              " Select InputField field ";
          }
        } else {
          errors[`eventKey[${index + 1}].inputField`] =
            "inputField field is required";
        }
         
        if(obj.isRequired && obj.inputField==="TextBox"){
  
          if (obj.hasOwnProperty("inputDataType")) {
            if (!inputDataType().includes(obj.inputDataType)) {
              errors[`eventKey[${index + 1}].inputDataType`] =
                "Select InputData Type";
            }
          } else {
            errors[`eventKey[${index + 1}].inputDataType`] =
              "inputDataType field  is required";
          }
  
  
        }
       
  
        if (optionRequired.includes(obj.inputField)) {
          if (obj.hasOwnProperty("option")) {
            if (obj.option.trim() === "") {
              errors[`eventKey[${index + 1}].option`] =
                "option field must have one choice";
            }
          }
           else {
            errors[`eventKey[${index + 1}].option`] =
              "option field value is required";
          }
  
        }
       
      });
    }

  }
  

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

