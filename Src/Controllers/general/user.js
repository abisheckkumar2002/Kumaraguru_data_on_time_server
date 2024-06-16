const db = require("../../Models/index.js");

const mongoose = require("mongoose");
const User = db.user;

exports.create = async (req, res) => {
  let reqBody = req.body;
  console.log(req.user.Id, "user.id user.iduser.id");

  // Corrected the if condition

  const newUser = {
    name: reqBody.name,
    email: reqBody.email,
    mobile: reqBody.mobile,
    UserId: reqBody.user_id,
    type_id: new mongoose.Types.ObjectId(reqBody.type_id),
    dep_id: new mongoose.Types.ObjectId(reqBody.dep_id),
    password: "kctmca",
    addedBy_Id: req.user.Id, // Get the id from authenticate user
  };
  console.log("newUser", reqBody.addedBy_id);

  try {
    const user = await User.create(newUser);
    res.status(200).send({
      status: "200",
      message: "User Added Successfully",
      data: user, // Optionally send back the created user data
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};
