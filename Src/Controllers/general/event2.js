const db = require("../../Models/index.js");
const Event = db.event; // Assuming EventVV is defined as a Mongoose model
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  try {
    const reqBody = req.body;
    const reqUserId = req.user.Id;

    await Event.create({
      tittle: reqBody.tittle,
      description: reqBody.description,
      eventType_id: new mongoose.Types.ObjectId(reqBody.eventType_id),
      eventId: reqBody.eventId,
      addedBy_Id: reqUserId,
      eventKey: reqBody.eventKey.map((item) => ({
        key: item.key,
        inputField: item.inputField,
        option: item.option ? item.option.split(",") : [],
        isMultiple: item.isMultiple,
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





exports.find = async (req, res) => {
  const pipeline = [
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.params.id),
        status: "Active",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "addedBy_Id",
        foreignField: "_id",
        as: "addedBy",
      },
    },
    { $unwind: "$addedBy" },
    {
      $lookup: {
        from: "eventtypes",
        localField: "eventType_id",
        foreignField: "_id",
        as: "eventType",
      },
    },
    { $unwind: "$eventType" },
    {
      $lookup: {
        from: "criteriatypes",
        localField: "criteriaType_id",
        foreignField: "_id",
        as: "criteriaType",
      },
    },
    { $unwind: "$criteriaType" },
    {
      $addFields: {
        addedByName: "$addedBy.name", // Create a new field with just the name value
        UserId: "$addedBy.UserId",
        eventType: "$eventType.eventType", // Extract eventType from the nested object
        criteriaType: "$criteriaType.criteriaType", // Extract criteriaType from the nested object
        eventType: "$eventType.eventtype",
      },
    },
    {
      $lookup: {
        from: "inputfields",
        localField: "eventkey.inputField_id",
        foreignField: "_id",
        as: "inputField",
      },
    },
    { $unwind: "$inputField" },
    {
      $lookup: {
        from: "inputtypes",
        localField: "eventkey.inputType_id",
        foreignField: "_id",
        as: "inputType",
      },
    },
    {
      $addFields: {
        inputTypeIdType: { $type: "$eventkey.inputType_id" }, // Check the type of inputType_id
      },
    },
    {
      $group: {
        _id: "$_id",
        title: { $first: "$tittle" },
        description: { $first: "$description" },
        status: { $first: "$status" },
        createdate: { $first: "$createdate" },
        addedByName: { $first: "$addedByName" },
        userId: { $first: "$UserId" },
        eventType: { $first: "$eventType" },
        criteriaType: { $first: "$criteriaType" },
        eventkey: {
          $push: {
            $cond: {
              if: { $ne: ["$eventkey.inputType_id", null] }, // Check if inputType_id is not null
              then: "$eventkey", // If not null, include the eventkey object
              else: "$REMOVE", // If null, remove the eventkey object
            },
          },
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$$ROOT"],
        },
      },
    },
  ];

  await Event.aggregate(pipeline)

    .then((data) => {
      if (data.length == 0)
        res.status(404).send({ message: "Not found Event with id " });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Event with id=" + id || err.message,
      });
    });
};
