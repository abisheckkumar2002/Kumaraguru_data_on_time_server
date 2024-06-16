const db = require("../../Models/index.js");
const UserType = db.usertype;

exports.findAll = async (req, res) => {
  
    const requestingUserType = req.user.user_Type;

    console.log("req.user",req.user)
  
    // Define the conditions based on the requesting user's type
    let condition = {};
  
    if (requestingUserType === "Principal") {
      // Exclude "Principal" type if the requesting user is "Principal"
      condition = { Type: { $ne: "Principal" } };
    } else if (requestingUserType === "Admin") {
      // Exclude "Principal" and "Admin" types if the requesting user is "Admin"
      condition = { Type: { $nin: ["Principal", "Admin"] } };
    } 


    else if (requestingUserType === "Head Of Department") {
   
      condition = { Type: { $nin: ["Principal", "Admin","Head Of Department"] } };
    } 

    else if (requestingUserType === "Montly Executor") {
   
      condition = { Type: { $nin: ["Principal", "Admin","Head Of Department","Montly Executor"] } };
    } 
  
    await UserType.find(condition)
      .then((data) => {
        res.send({
          status: "200",
          userType_list: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving User Type.",
        });
      });
  };
  
