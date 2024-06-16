module.exports = (app) => {
    let router = require("express").Router();
    const passport = require("passport");
  
    const passportAuth = passport.authenticate("principleAuth", {
      session: false,
    });
  
    const eventTypeCommonController = require("../../Controllers/common/eventtype.js");
  
    
    router.get("/", [passportAuth, eventTypeCommonController.findAll]);
  
    app.use("/principal/eventtype", router);
  };
  