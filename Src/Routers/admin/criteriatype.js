module.exports = (app) => {
    let router = require("express").Router();
    const passport = require("passport");
  
    const passportAuth = passport.authenticate("adminAuth", {
      session: false,
    });
  
    const commonCriteriaTypeValidation = require("../../Validations/common/criteriatype.js");
    const commonCriteriaTypeController = require("../../Controllers/common/criteriatype.js");
  
  
  
  
    router.post("/", [passportAuth,commonCriteriaTypeValidation.addCriteriatype, commonCriteriaTypeController.create]);
    router.get("/", [passportAuth, commonCriteriaTypeController.findAll]);
    router.get("/:id",[passportAuth,commonCriteriaTypeController.findOne])
    router.put("/:id", [passportAuth,commonCriteriaTypeValidation.updateCriteiaType, commonCriteriaTypeController.update]);
    router.delete("/:id", [passportAuth, commonCriteriaTypeController.delete]);
  
  
    app.use("/admin/criteriatype", router);
  };
  