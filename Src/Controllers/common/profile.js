const db = require("../../Models/index.js");

const mongoose = require("mongoose");

const User = db.user;

exports.updateProfile = async (req, res) => {
  const id = req.user.Id

    const reqBody = req.body;

    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!",
        });
      }
    
      
    
      await User.findByIdAndUpdate(id,reqBody, { useFindAndModify: false })   //{ useFindAndModify: false }  controll behavaiour
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update profile with id=${id}. Maybe User was not found!`,
            });
          } else
            res.send({
              status: "200",
              message: "UserProfile was updated successfully.",
            });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating UserProfile with id=" + id || err.message,
          });
        });





}




exports.findOne = async(req, res) => {
    const id = req.user.Id
    console.log(id,"idididididididididididididid")
  
   await User.findOne({ _id: new mongoose.Types.ObjectId( id), status: "Active" })
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found User with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with id=" + id||err.message });
        });
  };
  