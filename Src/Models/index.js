const mongoose = require("mongoose");

const dbConfig =require("../Config/config.js")

mongoose.Promise = global.Promise;

const db ={};

db.mongoose = mongoose;
db.url =dbConfig.mongoURI
db.department = require("../Models/department.js")
db.usertype =require("../Models/usertype.js")
db.user =require("../Models/user.js")
db.eventtype=require("../Models/eventtype.js")
db.criteriatype =require("../Models/criteriatype.js")
db.inputType=require("../Models/inputtype.js")
db.inputField =require("../Models/inputfield.js")
db.event =require("../Models/event.js")
db.eventData =require("../Models/eventData.js")
db.abi =require("../Models/event2.js") 
db.teachingStaff =require("../Models/user.js").teachingStaff
db.nonTeachingStaff =require("../Models/user.js").nonTeachingStaff


module.exports = db;
