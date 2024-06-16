module.exports =(app)=>{


    const router = require("express").Router();

  
    const inputTypeController = require("../../Controllers/common/inputtype.js");


    router.post("/",[inputTypeController.create]);
    // router.get("/",[inputTypeController.findAll]);

  
    app.use('/inputtype',router)

}