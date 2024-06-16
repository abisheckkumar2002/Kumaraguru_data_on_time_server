// const db = require("../../Models/index.js");
// const CriteriaType = db.criteriatype;
// const mongoose = require("mongoose");



// exports.create = async (req, res) => {
//   let reqBody = req.body;
//   console.log("CriteriaType", reqBody);
//   await CriteriaType.create({
//     criteriaType: reqBody.criteriaType,
//   })
//     .then(() => {
//       res.status(200).send({
//         status: "200",
//         message: "criteriaType Added Sucessfully",
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the criteriaType.",
//       });
//     });
// };



// exports.findAll = async (req, res) => {
//   const criteriaType = req.query.criteria_type;

//   console.log("request query", criteriaType);
//   let condition = criteriaType
//     ? {
//         criteriaType: { $regex: new RegExp(department), $options: "i" },
//         status: "Active",
//       }
//     : { status: "Active" };

//   await CriteriaType
//     .find(condition)
//     .sort({ criteriaType: 1 })
//     .then((data) => {
//       res.send({
//         status: "200",
//         criteria_type_list: data,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving criteriaType.",
//       });
//     });
// };





// exports.delete = async (req, res) => {

//   const id = req.params.id;
//   console.log("req.params.id", req.params.id);
//   await CriteriaType.findOneAndUpdate(
//     { _id: new mongoose.Types.ObjectId(req.params.id) },
//     { status: 0 },
//     { new: true }
//   )

//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete CriteriaType with id=${id}. Maybe CriteriaType was not found!`,
//         });
//       } else {
//         res.send({
//           status: "200",
//           message: "CriteriaType was deleted successfully!",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Could not delete CriteriaType with id=" + id || err.message,
//       });
//     });
// };



// exports.update = async (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!",
//     });
//   }

//   console.log("req.params.id", req.params.id);
//   console.log("req.body", req.body);
//   const id = req.params.id;

//   await CriteriaType.findOneAndUpdate(
//     { _id: new mongoose.Types.ObjectId(req.params.id) },
//     { status: 0 },
//     { new: true }
//   )
//     .then((data) => {
//       if (!data) {
//         res.send({
//           message: `Cannot update CriteriaType with id=${id}. Maybe CriteriaType was not found!`,
//         });
//       } else
//         res.send({
//           status: "200",
//           message: "CriteriaType was updated successfully.",
//         });
//     })
//     .catch((err) => {
//       res.send({
//         message: "Error updating CriteriaType with id=" + id || err.message,
//       });
//     });
// };
