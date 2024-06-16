const db = require("../../Models/index");
const EventType = db.eventtype;



exports.findAll = async(req,res)=>{


    const eventType = req.query.eventtype;

    console.log("request query", eventType);
    let condition = eventType
      ? { eventtype: { $regex: new RegExp(eventType), $options: "i" }, status: "Active"  }
      : { status: "Active" };

      console.log("condition", condition);


      await  EventType.find(condition)
      .then((data) => {
        res.send({
          status: "200",
          eventType_list: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving EventList.",
        });
      });
}