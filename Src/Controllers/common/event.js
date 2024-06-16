const db = require("../../Models/index.js");
const Event = db.event;

const EventType = db.eventtype;
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  try {
    const reqBody = req.body;
    const reqUserId = req.user.Id;

    console.log(reqBody, "eventKeyeventKeyeventKey");
    await Event.create({
      tittle: reqBody.tittle,
      description: reqBody.description,
      eventType_id: new mongoose.Types.ObjectId(reqBody.eventType_id),
      eventId: reqBody.eventId,
      addedBy_Id: reqUserId,
      eventKey: reqBody.eventKey.map((item) => ({
        key: item.key,
        inputField: item.inputField,
        inputDataType: item.inputDataType,
        isRequired: item.isRequired,
        option: item.option ? item.option.split(",") : [],
      })),
    });

    res.status(200).send({
      status: "200",
      message: "Event Added Successfully",
    });
  } catch (err) {
    res.status(500).send({
      status: "500",
      message: err.message || "Some error occurred while creating the Event.",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    console.log("GGGGGGGG");

    const eventTypeId = req.query.eventType_id;
    const eventTypeIdArray = req.user.eventTypeId;

    let condition = {
      status: "Active",
    };

    if (eventTypeId) {
      condition.eventType_id = new mongoose.Types.ObjectId(eventTypeId);
    } else if (eventTypeIdArray && eventTypeIdArray.length > 0) {
      condition.eventType_id = { $in: eventTypeIdArray };
    } else {
      throw new Error("Event type ID or array not provided.");
    }

    const eventList = await Event.find(condition)
      .populate({
        path: "eventType_id",
        select: "eventtype",
      })
      .sort({ createdate: -1 });

    res.status(200).send({
      status: "Success",
      event_list: eventList,
      count: eventList.length,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving events.",
    });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  await Event.findOne({ _id: id, status: "Active" })
    .populate({
      path: "eventType_id",
      select: "eventtype",
    })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found event with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving event with id=" + id || err.message,
      });
    });
};

exports.delete = async (req, res) => {
  await Event.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(req.params.id), status: "Active" },
    { status: 0 },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete event with id=${id}. Maybe event was not found!`,
        });
      } else {
        res.send({
          status: "200",
          message: "event was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Could not delete event with id=" + req.params.id || err.message,
      });
    });
};

exports.updateOne = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const {
      body: reqBody,

      params: { id: id },
    } = req;


    console.log(reqBody.eventKey,"reqBody.eventKeyreqBody.eventKeyreqBody.eventKey")

  const ExistingEvent =  await Event.findOne({ _id: id, status: "Active" })

  console.log(ExistingEvent,"ExistingEventExistingEventExistingEvent")

  const newEventKeyArray =reqBody.eventKey?ExistingEvent.eventKey.concat(reqBody.eventKey):ExistingEvent.eventKey



    const bodyData = {
      tittle: reqBody.tittle,
      description: reqBody.description,
      eventType_id: new mongoose.Types.ObjectId(reqBody.eventType_id),
      eventId: reqBody.eventId,
      eventKey: newEventKeyArray
      
    };


   
  
    

    const updatedEvent = await Event.findByIdAndUpdate( id,   bodyData,  { useFindAndModify: false });

    if (!updatedEvent) {
      return res.status(404).send({
        message: `Cannot update Event with id=${id}  Maybe Event was not found!`,
      });
    }

    res.status(200).send({
      status: "200",
      message: "Event was updated successfully.",
    });
  } catch (err) {
    res.status(500).send({
      message: "Error updating Event: " + err.message,
    });
  }
};
