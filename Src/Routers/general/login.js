module.exports =(app)=>{
    var router = require("express").Router();

  
    const loginController = require("../../Controllers/general/login.js");

router.post("/",[loginController.userLogin])

app.use("/login",router)
}
