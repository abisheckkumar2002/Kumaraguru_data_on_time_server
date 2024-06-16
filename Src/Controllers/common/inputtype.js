const db = require("../../Models/index.js");
const InputType = db.inputType;
const mongoose = require("mongoose");







exports.create = async (req, res) => {
    let reqBody = req.body;
    console.log("inputType", reqBody);
  
    await InputType.create({
        inputType: reqBody.inputType,
     
    })
      .then(() => {
        res.status(200).send({
          status: "200",
          message: "inputType Added Sucessfully",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the inputType.",
        });
      });
  };




  exports.findAll = async (req, res) => {
    const inputType = req.query.inputType;
  


    console.log(req,"yesss");
  
    console.log("request query", InputType);
    let condition = inputType
      ? { inputType: { $regex: new RegExp(inputType), $options: "i" },  status: "Active" } 
      : { status: "Active" };
  
      await InputType.find(condition)
      .sort({  createdate: -1 })
      .exec()
      .then((data) => {
        res.send({
          status: "200",
          inputType_list: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving InputType.",
        });
      });
  };
  