module.exports = (app) => {

    var router = require("express").Router();
    const  passport= require("passport");

    const passportAuth = passport.authenticate("adminAuth", { session: false });
    
    const commonUserController =require("../../Controllers/common/usertype.js")
  
    router.get("/", [passportAuth,commonUserController.findAll]);
    
  
    app.use("/admin/user_type",router)
  };
  