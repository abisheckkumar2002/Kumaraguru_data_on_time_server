const db = require("../../Models/index");
const EventType = db.eventtype;

exports.create = async (req, res) => {
  var reqBody = req.body;
  console.log("reqBody", reqBody);

  await EventType.create({
    eventtype: reqBody.eventtype,
  })
    .then(() => {
      res.status(200).send({
        status: "200",
        message: "EventType Added Sucessfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Eventype.",
      });
    });
};


exports.findAll = async(req,res)=>{


    const eventType = req.query.eventtype;

    console.log("request query", eventType);
    let condition = eventType
      ? { eventtype: { $regex: new RegExp(eventType), $options: "i" } }
      : {};

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
