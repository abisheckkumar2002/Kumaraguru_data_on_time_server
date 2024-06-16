const db = require("../../Models/index.js");
const InputField = db.inputField;
const mongoose = require("mongoose");



exports.create = async (req, res) => {
  let reqBody = req.body;
  console.log("inputField", reqBody);

  await InputField.create({
    inputField: reqBody.inputField,
  })
    .then(() => {
      res.status(200).send({
        status: "200",
        message: "Input Field Added Sucessfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the inputfield.",
      });
    });
};






exports.findAll = async (req, res) => {
    const inputField = req.query.inputField;
  
    console.log("yesss");
  
    console.log("request query", inputField);
    let condition = inputField
      ? { inputField: { $regex: new RegExp(inputField), $options: "i" },  status: "Active" } 
      : { status: "Active" };
  
      await InputField.find(condition)
      .sort({  createdate: -1 })
      .exec()
      .then((data) => {
        res.send({
          status: "200",
          inputField_list: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving InputField.",
        });
      });
  };
  
