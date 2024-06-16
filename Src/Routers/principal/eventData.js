module.exports = (app) => {
  let router = require("express").Router();
  const passport = require("passport");

  const  uploadFile= require("../../middleware/fileUpload.js");

  const passportAuth = passport.authenticate("principleAuth", {
    session: false,
  });

  const eventDataController = require("../../Controllers/common/eventData.js");

  const eventDataValidation = require("../../Validations/common/eventData.js");



  router.post("/",[ passportAuth,uploadFile.conditionalUpload, eventDataValidation.addEvent,eventDataController.create])
  

  router.get("/alllist/:id", [  passportAuth,  eventDataController.findAllDataList]);
  router.get("/mylist/:id", [passportAuth,eventDataController.findAllMyDataList]);
  router.get("/:id1/:id2", [passportAuth, eventDataController.findOne]);
  router.put("/:id1/:id2",[passportAuth, uploadFile.conditionalUpload,eventDataValidation.updateEvent,eventDataController.updateOne])
  router.delete("/:id", [passportAuth, eventDataController.delete]);

  app.use("/principal/eventData", router);
};
