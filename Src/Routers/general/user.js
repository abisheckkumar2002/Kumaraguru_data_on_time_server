
module.exports = (app) => {

    const router = require("express").Router();
    const  passport= require("passport");

    const passportAuth = passport.authenticate("principleAuth", { session: false });

   
    const userController = require("../../Controllers/general/user.js");

    router.post("/",[passportAuth,userController.create])




    app.use("/user",router)
  
}