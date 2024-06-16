module.exports = (app) => {

  var router = require("express").Router();
 
  const criteriaTypeController = require("../../Controllers/general/criteriatype.js");

  router.post("/",[criteriaTypeController.create])
  router.get("/",[criteriaTypeController.findAll])

app.use("/criteriatype",router)
};
