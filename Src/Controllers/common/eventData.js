const db = require("../../Models/index.js");
const EventData = db.eventData;
const Event = db.event;
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  try {
    console.log;
    console.log(req.file, "req.filereq.filereq.filereq.file");
    const reqBody = req.body;
    const reqFile = req.file.filename;
    const reqUserId = req.user.Id;
    const parasData = JSON.parse(reqBody.eventData);

    await EventData.create({
      event_Id: new mongoose.Types.ObjectId(reqBody.event_Id),
      recordFile: reqFile,
      eventData: parasData,
      addedBy_Id: reqUserId,
    });

    res.status(200).send({
      status: "200",
      message: "EventData Added Successfully",
    });
  } catch (err) {
    res.status(500).send({
      status: "500",
      message: err.message || "Some error occurred while creating the Event.",
    });
  }
};

exports.findAllDataList = async (req, res) => {
  try {
    const event_Id = req.params.id;
    console.log("request params", req.event_Id);

    console.log(EventData, "EventDataEventDataEventData");

    let condition = {
      event_Id: new mongoose.Types.ObjectId(event_Id),
      status: "Active",
    };

    const aggregationPipeline = [
      { $match: condition },

      {
        $lookup: {
          from: "users",
          localField: "addedBy_Id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      {
        $lookup: {
          from: "departments",
          localField: "user.dep_id",
          foreignField: "_id",
          as: "department",
        },
      },
      { $unwind: "$department" },
      {
        $lookup: {
          from: "usertypes",
          localField: "user.type_id",
          foreignField: "_id",
          as: "type",
        },
      },

      { $unwind: "$type" },
      {
        $project: {
          eventId: "$event_Id",
          eventData: "$eventData",
          addedBy_Details: {
            name: "$user.name",
            UserId: "$user.UserId",
            email: "$user.email",
            mobile: "$user.mobile",
            department: "$department.department",
            type: "$type.Type",
          },
        },
      },
    ];

    const eventData_list = await EventData.aggregate(aggregationPipeline).sort({
      createdate: -1,
    });

    res.status(200).json({ eventData_list });
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while retrieving eventData list.",
    });
  }
};

exports.findAllMyDataList = async (req, res) => {
  try {
    let resultData = [];
    const eventId = req.params.id;
    const userId = req.user.Id;
    console.log("request params", eventId);
    console.log("request userId", userId);
    let condition = {
      addedBy_Id: new mongoose.Types.ObjectId(userId),
      event_Id: new mongoose.Types.ObjectId(eventId),
      status: "Active",
    };

    console.log(condition, "conditionconditioncondition");
    const eventData = await EventData.find(condition).sort({
      createdate: -1,
    });

    eventData.map((item) => {
      const data = {};

      item.eventData.map((item) => {
        data[item.key] = item[item.key];
      });
      resultData.push(data);

      data["_id"] = item._id;
      data["event_Id"] = item.event_Id;
      data["recordFile"] = item.recordFile;
    });

    res.status(200).json({ myevent_list: resultData });
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while retrieving eventData list.",
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const eventDataId = req.params.id1;
    const eventId = req.params.id2;

    const condition = {
      _id: new mongoose.Types.ObjectId(eventId),
      event_Id: new mongoose.Types.ObjectId(eventDataId),

      status: "Active",
    };
    const aggregationPipeline = [
      { $match: condition },
      {
        $lookup: {
          from: "users",
          localField: "addedBy_Id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "departments",
          localField: "user.dep_id",
          foreignField: "_id",
          as: "department",
        },
      },
      { $unwind: "$department" },
      {
        $lookup: {
          from: "usertypes",
          localField: "user.type_id",
          foreignField: "_id",
          as: "type",
        },
      },
      { $unwind: "$type" },
      {
        $project: {
          eventId: "$event_Id",
          createdate: "$createdate",
          eventData: "$eventData",
          recordFile: "$recordFile",
          addedBy_Details: {
            name: "$user.name",
            UserId: "$user.UserId",
            email: "$user.email",
            mobile: "$user.mobile",
            department: "$department.department",
            type: "$type.Type",
          },
        },
      },
    ];

    const eventData = await EventData.aggregate(aggregationPipeline);

    if (!eventData || eventData.length === 0) {
      return res.status(404).json({
        message: `No event data found with eventId: ${eventId}, _id: ${eventDataId}`,
      });
    }

    res.json(eventData[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error retrieving event data: ${err.message}` });
  }
};

exports.delete = async (req, res) => {
  const userId = req.user.Id;
  await EventData.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(req.params.id),
      status: "Active",
      addedBy_Id: new mongoose.Types.ObjectId(userId),
    },
    { status: 0 },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete EventData with id=${id}. Maybe event was not found!`,
        });
      } else {
        res.send({
          status: "200",
          message: "EventData was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Could not delete EventData  with id=" + req.params.id || err.message,
      });
    });
};

exports.updateOne = async (req, res) => {
  try {
    const {
      body: reqBody,
      file: reqFile,
      params: { id1: eventId, id2: eventDataId },
      user: { Id: reqUserId },
    } = req;

    
    const parasData = JSON.parse(reqBody.eventData);

    console.log(reqFile, "reqFilereqFilereqFilereqFile");

    const bodyData = {
      eventData: parasData,
    };
    if (req && reqFile) {
      bodyData.recordFile = reqFile.filename;
    }
    // console.log(eventId, "eventId");
    // console.log(eventDataId, "eventDataId");
    // console.log(bodyData, "bodyDatabodyDatabodyDatabodyDatabodyDatabodyDatabodyData");

    const updatedEventData = await EventData.findByIdAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(eventDataId),
        event_Id: new mongoose.Types.ObjectId(eventId),
      },
      bodyData,
      { useFindAndModify: false }
    );

    if (!updatedEventData) {
      return res.status(404).send({
        message: `Cannot update EventData with id=${eventId} and eventDataId=${eventDataId}. Maybe EventData was not found!`,
      });
    }

    res.status(200).send({
      status: "200",
      message: "EventData was updated successfully.",
    });
  } catch (err) {
    res.status(500).send({
      message: "Error updating EventData: " + err.message,
    });
  }
};
