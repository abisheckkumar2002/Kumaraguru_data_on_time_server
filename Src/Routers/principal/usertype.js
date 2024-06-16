module.exports=(app)=>{
    const  passport= require("passport");
    let router = require("express").Router();
 
    const commonUserTypeController =require("../../Controllers/common/usertype.js")
    const passportAuth = passport.authenticate("principleAuth", { session: false });

    console.log(passportAuth,"passportAuth")

    router.get("/", [passportAuth,commonUserTypeController.findAll]);

    app.use("/principal/user_type",router)


}