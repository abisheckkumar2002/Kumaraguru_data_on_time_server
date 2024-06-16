module.exports =(app)=>{


    const router = require("express").Router();

    // const EventTypeValidation = require("../../Validations/common/eventtype.js");
    const eventTypeController = require("../../Controllers/common/eventtype.js");


    // router.post("/",[eventTypeController.create]);
    router.get("/",[eventTypeController.findAll]);

  
    app.use('/eventtype',router)

}