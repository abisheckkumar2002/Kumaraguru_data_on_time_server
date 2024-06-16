const multer = require("multer");
const mongoose = require("mongoose");
const path = require("path");
const db = require("../Models/index.js");

const EventData = db.eventData;
const Event = db.event;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Src/public/records");
  },
  filename: async function (req, file, cb) {
    try {
      const reqUser = req.user ? req.user.userId : "anonymous";
      const _id = req.user ? req.user.Id : null;
      const reqBody = req.body;

      if (!reqBody.event_Id) {
        return cb(new Error("Event ID is required"), false);
      }

      const eventObj = await Event.findOne({
        _id: new mongoose.Types.ObjectId(reqBody.event_Id),
        status: "Active",
      });

      if (!eventObj) {
        return cb(new Error("Event not found or not active"), false);
      }

      const abi = await EventData.find({
        event_Id: new mongoose.Types.ObjectId(reqBody.event_Id),
        addedBy_Id: _id,
        status: "Active",
      });

      const eventDataLen = abi.length + 1;
      const eventId = eventObj.eventId;
      const filename = `${reqUser}_${eventId}_${Date.now()}${path.extname(file.originalname)}`;
      cb(null, filename);
    } catch (error) {
      cb(error);
    }
  },
});

function checkFileType(file, cb) {
  const fileType = /pdf/;
  const extname = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileType.test(file.mimetype);
  if (mimetype && extname) {
    cb(null, true);
  } else {
    console.log("Allow only PDF file");
    cb("Allow PDF file only");
  }
}

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

exports.conditionalUpload = (req, res, next) => {
  if (req.headers['content-type'] && req.headers['content-type'].startsWith('multipart/form-data')) {
    upload.single('recordFile')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  } else {
    next();
  }
};


