module.exports = (app) => {
  let router = require("express").Router();
  const passport = require("passport");

  const passportAuth = passport.authenticate("principleAuth", {
    session: false,
  });

  const inputFieldCommonController = require("../../Controllers/common/inputfield.js");

  router.post("/", [passportAuth, inputFieldCommonController.create]);
  router.get("/", [passportAuth, inputFieldCommonController.findAll]);

  app.use("/principal/inputfield", router);
};
