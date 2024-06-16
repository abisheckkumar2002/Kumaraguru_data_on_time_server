const db = require("../../Models/index.js");
const UserType = db.usertype;

exports.findAll = async (req, res) => {
  const type = req.query.Type;

  console.log("request query", type);
  var condition = type
    ? { Type: { $regex: new RegExp(type), $options: "i" } }
    : {};

  await UserType.find(condition)
    .then((data) => {
      const filteredData = data.filter(
        (item) =>
          item.Type.toLowerCase().replace(/\s/g, "") !== "principal" 
          // item.Type.toLowerCase().replace(/\s/g, "") !== "admin"
          // && item.Type.toLowerCase().replace(/\s/g, '') !== "departmentpa"
      );
      return filteredData;
    })
    .then((filterData) => {
      res.send({
        status: "200",
        userType_list: filterData,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User Type.",
      });
    });
};

exports.create = async (req, res) => {
  var reqBody = req.body;
  console.log("type", reqBody);
  await UserType.create({
    Type: reqBody.Type,
  })
    .then(() => {
      res.status(200).send({
        status: "200",
        message: "Type Added Sucessfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user Type.",
      });
    });
};
