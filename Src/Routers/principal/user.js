module.exports = (app) => {

    const router = require("express").Router();
    const  passport= require("passport");

    const passportAuth = passport.authenticate("principleAuth", { session: false });

    const userValidation = require("../../Validations/common/user.js");
  
    const commonUserController =require("../../Controllers/common/user.js")

    router.post("/",[passportAuth,userValidation.addUser,commonUserController.create])
    router.put("/:id",[passportAuth,userValidation.updateUser,commonUserController.update])
    router.get("/:id",[passportAuth,commonUserController.findOne])
    router.delete("/:id",[passportAuth,commonUserController.delete])
    router.get("/",[passportAuth,commonUserController.findAll])
  



    app.use("/principal/user",router)
  
}