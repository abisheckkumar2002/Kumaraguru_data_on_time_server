module.exports = (app) => {
  var router = require("express").Router();
 
  const departmentController = require("../../Controllers/general/department.js");

  router.post("/", [departmentController.create]);
  router.get("/" , [departmentController.findAll])
  router.get("/:id" , [departmentController.findOne])
  router.put("/:id",[departmentController.update])
  router.delete("/:id",[departmentController.delete])

  app.use("/department", router);
};
