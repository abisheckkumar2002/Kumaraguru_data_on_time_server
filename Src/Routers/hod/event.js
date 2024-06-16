module.exports = (app) => {
    let router = require("express").Router();
    const passport = require("passport");
  
    const passportAuth = passport.authenticate("hodAuth", {
      session: false,
    });
  
    const eventCommonController = require("../../Controllers/common/event.js");
  
    
    router.post("/", [passportAuth, eventCommonController.create]);
    router.get("/", [passportAuth, eventCommonController.findAll]);

    // router.get("/student", [passportAuth, eventCommonController.getStudentEventList]);
    // router.get("/faculty", [passportAuth, eventCommonController.getFacultyEventList]);
    // router.get("/department", [passportAuth, eventCommonController.getDepartmentEventList]);
  
  
    app.use("/hod/event", router);
  };
  