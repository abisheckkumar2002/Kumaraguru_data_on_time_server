const mongoose = require('mongoose');

module.exports.isEmpty = (value) => {
    return value === undefined || 
           value === null || 
           (typeof value === 'object' && Object.keys(value).length === 0) ||
           (typeof value === 'string' && value.trim().length === 0) ||
           (typeof value === 'string' && value === "")|| 
           (mongoose.Types.ObjectId.isValid(value) && value.toString() === "")
           || (value instanceof mongoose.Types.ObjectId && value.toString() === "")
};
