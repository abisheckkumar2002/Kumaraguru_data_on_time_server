module.exports = (app) => {

    const router = require("express").Router();
    const  passport= require("passport");

    const passportAuth = passport.authenticate("principleAuth", { session: false });

    const userProfileValidation = require("../../Validations/common/updateProfile.js");
  
    const commonProfileController =require("../../Controllers/common/profile.js")

    router.put("/update",[passportAuth,userProfileValidation.updateUser,commonProfileController.updateProfile])
    router.get("/",[passportAuth,commonProfileController.findOne])
  
  



    app.use("/principal/userprofile",router)
  
}