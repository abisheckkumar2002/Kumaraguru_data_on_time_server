const db = require("../../Models/index.js");

const mongoose = require("mongoose");

const User = db.user;
const UserType = db.usertype;
const EventType = db.eventtype;

exports.create = async (req, res) => {
  const reqBody = req.body;
  console.log(reqBody, "reqBody");

  const requestingUserType = req.user.user_Type;

  console.log(requestingUserType, "requestingUserType");

  const newUser = {
    name: reqBody.name,
    email: reqBody.email.toLowerCase(),
    mobile: reqBody.mobile,
    UserId: reqBody.UserId,
    type_id: new mongoose.Types.ObjectId(reqBody.type_id),
    dep_id: new mongoose.Types.ObjectId(reqBody.dep_id),
    password: reqBody.UserId, //static password
    conform_password: reqBody.UserId,
    addedBy_Id: req.user.Id, // Get the id from authenticate user
    typeList_id: await getUserTypeArray(reqBody), // user list view based on the userType like hod view list of staff, montly, pa
    eventType_id: await getEventTypeArray(reqBody), // list value for the filter the event based on the userType ex staff only show the staff events
  };

  console.log("newUser", reqBody.addedBy_id);

  try {
    const user = await User.create(newUser);
    res.status(200).send({
      status: "200",
      message: "User Added Successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};

exports.update = async (req, res) => {
  let reqBody = req.body;
  console.log("reqbody", req.body);
  if (!req.body) {
    return res.status(400).send({
      message: "Data to Update can not be Empty",
    });
  }

  const id = req.params.id;
  console.log(req.body, "req.bodyreq.bodyreq.bodyreq.bodyreq.bodyreq.body");

  reqBody.eventType_id = await getEventTypeArray(reqBody);
  reqBody.typeList_id = await getUserTypeArray(reqBody);
  const aa = await User.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.status(200).send({
          status: "200",
          message: "User was updated successfully.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id || err.message,
      });
    });

  console.log(aa, "aaaaaaaaaaaa");
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  const paramsId = { _id: new mongoose.Types.ObjectId(req.params.id) }; // Convert string id to ObjectId

  const aggregationPipeline = [
    { $match: paramsId },
    {
      $lookup: {
        from: "departments",
        localField: "dep_id",
        foreignField: "_id",
        as: "department",
      },
    },
    { $unwind: "$department" },
    {
      $lookup: {
        from: "users",
        localField: "addedBy_Id",
        foreignField: "_id",
        as: "addedBy",
      },
    },
    { $unwind: "$addedBy" },
    {
      $lookup: {
        from: "usertypes",
        localField: "type_id",
        foreignField: "_id",
        as: "type",
      },
    },
    { $unwind: "$type" },
    {
      $project: {
        _id: "$_id",
        department: "$department.department",
        dep_id: "$department._id",
        name: "$name",
        UserId: "$UserId",
        email: "$email",
        mobile: "$mobile",
        type: "$type.Type",
        type_id: "$type._id",
        addedBy: "$addedBy.name",
      },
    },
  ];

  await User.aggregate(aggregationPipeline)

    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id || err.message,
      });
    });
};

exports.delete = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(req.params.id) },
    { status: 0 },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`,
        });
      } else {
        res.send({
          status: "200",
          message: "user was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user with id=",
      });
    });
};

exports.findAll = async (req, res) => {
  const userType = req.query.userType_id;
  const UserId = req.query.userId;
  const email = req.query.email;
  const dep_id = req.query.dep_id;
  const userTypeList = req.user.usertypeList;
  const requestingUserType = req.user.user_Type;

  let userTypeQuery;
  if (userType) {
    userTypeQuery = new mongoose.Types.ObjectId(userType);
  } else {
    userTypeQuery = { $in: userTypeList };
  }

  let query = {
    type_id: userTypeQuery,
    status: "Active"
  };

  if (["Head Of Department", "Montly Executor"].includes(requestingUserType)) {
    query.dep_id = req.user.depId._id;
  }

  if (dep_id) {
    query.dep_id = new mongoose.Types.ObjectId(dep_id);
  }

  if (UserId) {
    query.UserId = { $regex: new RegExp(UserId), $options: "i" };
  }

  if (email) {
    query.email = { $regex: new RegExp(email.toLowerCase()), $options: "i" };
  }

  const aggregationPipeline = [
    { $match: query },
    {
      $lookup: {
        from: "departments",
        localField: "dep_id",
        foreignField: "_id",
        as: "department"
      }
    },
    { $unwind: "$department" },
    {
      $lookup: {
        from: "users",
        localField: "addedBy_Id",
        foreignField: "_id",
        as: "addedBy"
      }
    },
    { $unwind: "$addedBy" },
    {
      $lookup: {
        from: "usertypes",
        localField: "type_id",
        foreignField: "_id",
        as: "type"
      }
    },
    { $unwind: "$type" },
    {
      $project: {
        _id: "$_id",
        department: "$department.department",
        name: "$name",
        UserId: "$UserId",
        email: "$email",
        mobile: "$mobile",
        type: "$type.Type",
        addedBy: "$addedBy.name",
        createdAt: 1 // Include createdAt field in projection
      }
    },
    { $sort: { createdAt: -1 } } // Sort by createdAt field
  ];

  try {
    const users = await User.aggregate(aggregationPipeline);
    res.json({
      users: users,
      length: users.length
    });
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving users: " + err.message
    });
  }
};

// function for event type array value based on the user type

const getEventTypeArray = async (reqBody) => {
  console.log(
    reqBody,
    "getEventTypeArraygetEventTypeArraygetEventTypeArraygetEventTypeArraygetEventTypeArray"
  );
  const userTypeData = await UserType.findOne({ _id: reqBody.type_id }); // hod,principal
  const eventType = await EventType.find(); // student ,faculty,department

  var userTypeArray = [];

  if (
    [
      "Admin",
      "Principal",
      "Head Of Department",
      "Montly Executor",
      "Department PA",
    ].includes(userTypeData.Type)
  ) {
    userTypeArray = eventType.map((item) => item._id);
  } else if (userTypeData.Type === "Faculty") {
    userTypeArray = eventType
      .filter((item) => item.eventtype === "Faculty Event")
      .map((item) => item._id);
  }

  return userTypeArray;
};

const getUserTypeArray = async (reqBody) => {
  console.log(
    reqBody,
    "getUserTypeArraygetUserTypeArraygetUserTypeArraygetUserTypeArray"
  );
  const userTypeData = await UserType.findOne({ _id: reqBody.type_id });
  const UserTypeList = await UserType.find();

  var userTypeArray = [];

  if (userTypeData.Type === "Principal") {
    userTypeArray = UserTypeList.filter(
      (item) => item.Type !== "Principal"
    ).map((item) => item._id);
  } else if (userTypeData.Type === "Admin") {
    userTypeArray = UserTypeList.filter(
      (item) => item.Type !== "Principal" && item.Type !== "Admin"
    ).map((item) => item._id);
  } else if (userTypeData.Type === "Head Of Department") {
    userTypeArray = UserTypeList.filter(
      (item) =>
        item.Type !== "Admin" &&
        item.Type !== "Principal" &&
        item.Type !== "Head Of Department"
    ).map((item) => item._id);
  } else if (userTypeData.Type === "Montly Executor") {
    userTypeArray = UserTypeList.filter(
      (item) =>
        item.Type !== "Admin" &&
        item.Type !== "Principal" &&
        item.Type !== "Head Of Department" &&
        item.Type !== "Montly Executor"
    ).map((item) => item._id);
  } else if (
    userTypeData.Type === "Faculty" ||
    userTypeData.Type === "Department PA"
  ) {
    userTypeArray = [];
  }

  return userTypeArray;
};
