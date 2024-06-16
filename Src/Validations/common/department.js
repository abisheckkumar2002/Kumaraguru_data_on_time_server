const { isEmpty } = require("../../helper/isEmpty");

const db = require("../../Models/index.js");

const mongoose = require("mongoose");
const Department = db.department;

exports.addDepartment = async (req, res, next) => {
  let errors = {},
    reqBody = req.body;

  if (isEmpty(reqBody.department)) {
    errors.department = "Department is required";
  }

  if (isEmpty(reqBody.sortForm)) {
    errors.sortForm = "Sort Form is required";
  }

  const existingDepartment = await Department.findOne({
    department: reqBody.department,
  });
  const existingsortForm = await Department.findOne({
    sortForm: reqBody.sortForm,
  });

  if (existingDepartment) {
    errors.department = "Department name already Exists";
  }

  if (existingsortForm) {
    errors.sortForm = " Sort Form already Exists";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};



exports.updateDepartment = async (req, res, next) => {
    let reqBody = req.body;
    console.log(reqBody.department,"reqBodyreqBody")
    
    let errors = {};
  
    // Find the department to be updated by its ID
    const updateDepartment = await Department.findOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
    });
  
    console.log(updateDepartment,"updateDepartment")
    if (!updateDepartment) {
      return res.status(400).json({
        message: "Department with the provided ID not found",
      });
    }
  
    // Check if department name is empty
    if (isEmpty(reqBody.department)) {
      errors.department = "Department is required";
    }
  
    // Check if sort form is empty
    if (isEmpty(reqBody.sortForm)) {
      errors.sortForm = "Sort form is required";
    }
  
    // Check if department name already exists (excluding the current department being updated)
    const existingDepartment = await Department.findOne({
      _id: { $ne: updateDepartment._id },
      department: reqBody.department,
    });
    if (existingDepartment) {
      errors.department = "Department name already exists";
    }
  
    // Check if sort form already exists (excluding the current department being updated)
    const existingSortForm = await Department.findOne({
      _id: { $ne: updateDepartment._id },
      sortForm: reqBody.sortForm,
    });
    if (existingSortForm) {
      errors.sortForm = "Sort Form form already exists";
    }
  
    // If there are errors, return 400 status with error messages
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }
  
    // If no errors, proceed to the next middleware
    next();
  };
  
