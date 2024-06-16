const { isEmpty } = require("../../helper/isEmpty.js");

const db = require("../../Models/index.js");

const mongoose = require("mongoose");
const CriteriaType = db.criteriatype;

exports.addCriteriatype = async (req, res, next) => {
  let errors = {},
    reqBody = req.body;

  if (isEmpty(reqBody.criteriaType)) {
    errors.criteriaType = "Criteria Type field is required";
  }

  const existingcriteriaType = await CriteriaType.findOne({
    criteriaType: reqBody.criteriaType,status:"Active"
  });

  if (existingcriteriaType) {
    errors.criteriaType = "Criteria Type name already Exists";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

exports.updateCriteiaType = async (req, res, next) => {
  let errors = {},
    reqBody = req.body;



    console.log(reqBody.criteriaType,"abiiiiis")
    const updateCriteiaType = await CriteriaType.findOne({
        _id: new mongoose.Types.ObjectId(req.params.id),
        status: "Active"
      });
      

  console.log(updateCriteiaType, "updateCriteiaTypeupdateCriteiaType");
 
  if (!updateCriteiaType) {

    return res.status(400).json({
      message: "CriteiaType with the provided ID not found",
    });

  }

  if (isEmpty(reqBody.criteriaType)) {
    errors.criteriaType = "criteriaType  field is required";
  }

  const existingcriteriaType = await CriteriaType.findOne({
    _id: { $ne: updateCriteiaType._id },
    status: "Active",
    criteriaType: reqBody.criteriaType
  });
  
  console.log(existingcriteriaType, "existingcriteriaType");

 

  if (existingcriteriaType) {
    errors.criteriaType = "criteriaType name already exists";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  // If no errors, proceed to the next middleware
  next();
};
