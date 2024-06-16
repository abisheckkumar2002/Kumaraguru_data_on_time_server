module.exports =(app)=>{


    var router = require("express").Router();

   
    const eventTypeController = require("../../Controllers/general/eventtype.js");


    router.post("/",[eventTypeController.create]);
    router.get("/",[eventTypeController.findAll]);

  
    app.use('/eventtype',router)

}