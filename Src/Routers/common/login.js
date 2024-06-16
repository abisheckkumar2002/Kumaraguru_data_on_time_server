module.exports =(app)=>{
    var router = require("express").Router();

   
    const loginController = require("../../Controllers/general/login.js");
    const commonLoginValidation =require("../../Validations/common/login.js")

router.post("/",[commonLoginValidation.login,loginController.userLogin])

app.use("/login",router)
}
