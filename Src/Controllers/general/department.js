const db = require("../../Models/index.js");
const Department = db.department;

exports.create = async (req, res) => {
  var reqBody = req.body;
  console.log("deparment", reqBody);
  await Department.create({
    department: reqBody.Department,
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
          err.message || "Some error occurred while creating the Category.",
      });
    });
};

exports.findAll = async (req, res) => {
  const department = req.query.department;
  console.log("essss");
  console.log("request query", Department);
  var condition = department
    ? { department: { $regex: new RegExp(department), $options: "i" } }
    : {};

  await  Department.find(condition)
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

exports.findOne = async (req, res) => {
  const id = req.params.id;
  console.log("params id", id);
  await Department.findOne({ _id: id })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found department with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving category with id=" + id,
      });
    });
};

exports.update =  async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  console.log("req.params.id", req.params.id);
  console.log("req.body", req.body);
  const id = req.params.id;

  await Department.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(
    (data) => {
      if (!data) {
        res.send({
          message: `Cannot update Department with id=${id}. Maybe Department was not found!`,
        });
      } else
        res.send({
          status: "200",
          message: "Department was updated successfully.",
        });
    }
  )
  .catch((err)=>{
    res.send({  message: "Error updating Deparment with id=" + id||err.message})
  })
};




exports.delete =async(req,res)=>{

    const id = req.params.id;
    console.log("req.params.id", req.params.id);
    await  Department.findOneAndDelete({ _id: id })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Department with id=${id}. Maybe Department was not found!`
                });
            } else {
                res.send({
                    status: "200",
                    message: "Department was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Department with id=" + id|| err.message
            });
        });

}