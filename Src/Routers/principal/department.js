module.exports = (app) => {
  let router = require("express").Router();
  const passport = require("passport");

  const passportAuth = passport.authenticate("principleAuth", {
    session: false,
  });
  
const  commonDepartmentValidation =require("../../Validations/common/department.js")
const commonDepartmentController =require("../../Controllers/common/department.js")

  router.post("/", [passportAuth,commonDepartmentValidation.addDepartment, commonDepartmentController.create]);
  router.get("/", [passportAuth, commonDepartmentController.findAll]);
  router.get("/:id",[passportAuth,commonDepartmentController.findOne])
  router.put("/:id", [passportAuth, commonDepartmentValidation.updateDepartment,commonDepartmentController.update]);
  router.delete("/:id", [passportAuth, commonDepartmentController.delete]);

  app.use("/principal/department", router);
};
