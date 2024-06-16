const db = require("../../Models/index.js");
const Department = db.department;
const mongoose = require("mongoose");



exports.create = async (req, res) => {
  let reqBody = req.body;
  console.log("deparment", reqBody);

  await Department.create({
    department: reqBody.department,
    sortForm: reqBody.sortForm,
  })
    .then(() => {
      res.status(200).send({
        status: "200",
        message: "Department Added Sucessfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Department.",
      });
    });
};


exports.findAll = async (req, res) => {
  const department = req.query.department;

  console.log("yesss");

  console.log("request query", department);
  var condition = department
    ? { department: { $regex: new RegExp(department), $options: "i" },  status: "Active" } 
    : { status: "Active" };

    await Department.find(condition)
    .sort({  createdate: -1 })
    .exec()
    .then((data) => {
      res.send({
        status: "200",
        department_list: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving department.",
      });
    });
};

exports.delete = async(req, res) => {
 
  await Department.findOneAndUpdate( { _id: new mongoose.Types.ObjectId(req.params.id), },
  { status: 0 },
  { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete department with id=${id}. Maybe department was not found!`,
        });
      } else {
        res.send({
          status: "200",
          message: "department was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete department with id=" + id||err.message,
      });
    });
};


exports.update =  async(req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await Department.findByIdAndUpdate(id, req.body, { useFindAndModify: false })   //{ useFindAndModify: false }  controll behavaiour
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update department with id=${id}. Maybe department was not found!`,
        });
      } else
        res.send({
          status: "200",
          message: "Department was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Department with id=" + id || err.message,
      });
    });
};





exports.findOne = async(req, res) => {
  const id = req.params.id;

 await Department.findOne({ _id: id, status: "Active" })
      .then(data => {
          if (!data)
              res.status(404).send({ message: "Not found Department with id " + id });
          else res.send(data);
      })
      .catch(err => {
          res
              .status(500)
              .send({ message: "Error retrieving Department with id=" + id||err.message });
      });
};
