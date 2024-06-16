const { isEmpty } = require("../../helper/isEmpty");
const db = require("../../Models/index.js");
const mongoose = require("mongoose");
const User = db.user;

exports.updateUser = async (req, res, next) => {
  const id = req.user.Id;
  let errors = {},
    reqBody = req.body;

  let mobileRegex = /^[7-9][0-9]{9}$/;

  // Validate password and conformpassword
  if (reqBody.password && reqBody.password.trim() !== "") {
    if (isEmpty(reqBody.conformpassword)) {
      errors.conformpassword = "Conform password is required";
    } else if (reqBody.password.trim() !== reqBody.conformpassword.trim()) {
      errors.password = "Passwords do not mccatch";
    }
  }

  else if (reqBody.conformpassword && reqBody.conformpassword.trim() !== "") {
    if (isEmpty(reqBody.password)) {
      errors.password = "Password is required";
    } else if (reqBody.password.trim() !== reqBody.conformpassword.trim()) {
      errors.conformpassword = "Passwords do nccot match";
    }
  }

  // Validate name
  if (isEmpty(reqBody.name)) {
    errors.name = "Name is required";
  }

  // Validate mobile number
  if (isEmpty(reqBody.mobile)) {
    errors.mobile = "Mobile number is required";
  } else if (!mobileRegex.test(reqBody.mobile)) {
    errors.mobile = "Please enter a valid mobile number";
  }

  // Validate UserId
  if (isEmpty(reqBody.UserId)) {
    errors.UserId = "User ID is required";
  }

  // Check if mobile number already exists
  const user = await User.findOne({
    _id: new mongoose.Types.ObjectId(id),
  });

  const existingMobile = await User.findOne({
    _id: { $ne: user._id },
    mobile: reqBody.mobile,
    status: "Active",
  });

  if (existingMobile) {
    errors.mobile = "Mobile number already exists";
  }

  console.log(errors, "errorserrorserrorserrors");
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  // If no errors, proceed to the next middleware
  next();
};
