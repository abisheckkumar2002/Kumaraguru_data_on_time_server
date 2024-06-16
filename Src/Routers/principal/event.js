module.exports = (app) => {
    let router = require("express").Router();
    const passport = require("passport");
  
    const passportAuth = passport.authenticate("principleAuth", {
      session: false,
    });
  
    const eventCommonController = require("../../Controllers/common/event.js");
      
    const generalController = require("../../Controllers/general/event2.js");
    const eventValidation = require("../../Validations/common/event.js");
  
    
    router.post("/", [passportAuth, eventValidation.addEvent,eventCommonController.create]);
  
    router.get("/", [passportAuth, eventCommonController.findAll]);
    router.get("/:id",[passportAuth,eventCommonController.findOne])
    router.put("/:id", [passportAuth,eventValidation.updateEvent, eventCommonController.updateOne]);
    router.delete("/:id", [passportAuth, eventCommonController.delete]);

    
  
  
    app.use("/principal/event", router);
  };
  