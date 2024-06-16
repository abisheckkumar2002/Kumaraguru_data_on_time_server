module.exports = (app) => {
    let router = require("express").Router();
    const passport = require("passport");
  
    const passportAuth = passport.authenticate("adminAuth", {
      session: false,
    });
  
    const inputTypeCommonController = require("../../Controllers/common/inputtype.js");
  
    router.post("/", [passportAuth, inputTypeCommonController.create]);
    router.get("/", [passportAuth, inputTypeCommonController.findAll]);
  
    app.use("/admin/inputtype", router);
  };
  