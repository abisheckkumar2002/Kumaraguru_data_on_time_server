module.exports = (app) => {

  var router = require("express").Router();

  const userTypeController = require("../../Controllers/general/usertype.js");

  router.get("/", [userTypeController.findAll]);
  router.post("/", [userTypeController.create]);

  app.use("/usertype", router);
};
