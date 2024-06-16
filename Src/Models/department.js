const mongoose = require('mongoose');

const departmentSchema =mongoose.Schema({

    department: {
        type: String,
        default: "",
        required: true,
        unique: true,
    },
    sortForm:{
        type: String,
        default: "",
        required: true,
        unique: true,
    },

    status: {
        type: String,
        default: "Active"
    },

    createdate: {
        type: Date,
        default: Date.now
    }

})

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;