const { isEmpty } = require("../../helper/isEmpty");

const db = require("../../Models/index.js");

const mongoose = require("mongoose");
const User = db.user;
const UserType = db.usertype;
const Department = db.department;

exports.addUser = async (req, res, next) => {
  let errors = {},
    reqBody = req.body;

  let mobileRegex = /^[7-9][0-9]{9}$/;
  let emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;

  const userEmail = await User.findOne({
    email: reqBody.email.toLowerCase(),
    status: "Active",
  });

  const userMobile = await User.findOne({
    mobile: reqBody.mobile,
    status: "Active",
  });

  console.log(userMobile, "userMobile");

  const userId = await User.findOne({
    UserId: reqBody.UserId,
    status: "Active",
  });
  if (mongoose.Types.ObjectId.isValid(reqBody.dep_id)) {
   
    const departmentExits = await Department.findOne({
      _id: new mongoose.Types.ObjectId(reqBody.dep_id),
      status: "Active",
    });
    console.log("departmentExits",departmentExits)
    if (!departmentExits) {
      errors.dep_id = "Department Id is not Exits in Department Collection";
    }
  } else {
    errors.dep_id = "dep  id format is invalid";
  }

  if (mongoose.Types.ObjectId.isValid(reqBody.type_id)) {
    const userTypeExists = await UserType.findOne({
      _id: new mongoose.Types.ObjectId(reqBody.type_id),
      status: "Active",
    });

    if (!userTypeExists) {
      errors.type_id = "type Id is not Exits in UserType Collection";
    }
  } else {
    errors.type_id = "Type id format is invalid";
  }

  if (isEmpty(reqBody.name)) {
    errors.name = "Name is required";
  }

  if (isEmpty(reqBody.mobile)) {
    errors.mobile = "mobile no is required";
  } else if (!mobileRegex.test(reqBody.mobile)) {
    errors.mobile = "please Enter Valid Mobile Number";
  }

  if (isEmpty(reqBody.email)) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(reqBody.email)) {
    errors.email = "please Enter Valid Email";
  }

  if (isEmpty(reqBody.dep_id)) {
    errors.dep_id = "Department  is required";
  }

  if (isEmpty(reqBody.type_id)) {
    errors.type_id = "Type   is required";
  }

  if (isEmpty(reqBody.UserId)) {
    errors.UserId = "User Id  is required";
  }

  if (userEmail) {
    errors.email = "Email already exits";
  }

  if (userMobile) {
    errors.mobile = "Mobile Number already exits";
  }

  if (userId) {
    errors.UserId = "UserId already exits";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

exports.updateUser = async (req, res, next) => {
  let errors = {};
  const reqBody = req.body;

  const mobileRegex = /^[7-9][0-9]{9}$/;
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;

  const userExists = await User.findOne({
    _id: new mongoose.Types.ObjectId(req.params.id),
    status: "Active",
  });

  if (!userExists) {
    return res
      .status(400)
      .json({ message: "User with the provided ID not found" });
  }

  const userEmail = await User.findOne({
    _id: { $ne: userExists._id },
    email: reqBody.email.toLowerCase(),
    status: "Active",
  });
  const userMobile = await User.findOne({
    _id: { $ne: userExists._id },
    mobile: reqBody.mobile,
    status: "Active",
  });
  const userId = await User.findOne({
    _id: { $ne: userExists._id },
    UserId: reqBody.UserId,
    status: "Active",
  });
  const departmentExists = await Department.findOne({
    _id: new mongoose.Types.ObjectId(reqBody.dep_id),
    status: "Active",
  });
  const userTypeExists = await UserType.findOne({
    _id: new mongoose.Types.ObjectId(reqBody.type_id),
    status: "Active",
  });

  if (isEmpty(reqBody.name)) {
    errors.name = "Name is required";
  }

  if (isEmpty(reqBody.mobile)) {
    errors.mobile = "Mobile is required";
  } else if (!mobileRegex.test(reqBody.mobile)) {
    errors.mobile = "Please enter a valid mobile number";
  }

  if (isEmpty(reqBody.email)) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(reqBody.email)) {
    errors.email = "Please enter a valid email";
  }

  if (isEmpty(reqBody.dep_id)) {
    errors.dep_id = "Department ID is required";
  } else if (!departmentExists) {
    errors.dep_id = "Department ID does not exist in Department Collection";
  }

  if (isEmpty(reqBody.type_id)) {
    errors.type_id = "Type ID is required";
  } else if (!userTypeExists) {
    errors.type_id = "Type ID does not exist in UserType Collection";
  }

  if (isEmpty(reqBody.UserId)) {
    errors.UserId = "User ID is required";
  } else if (userId) {
    errors.UserId = "User ID already exists";
  }

  if (userEmail) {
    errors.email = "Email already exists";
  }

  if (userMobile) {
    errors.mobile = "Mobile already exists";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
