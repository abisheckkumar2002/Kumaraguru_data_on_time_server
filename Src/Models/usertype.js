const mongoose = require('mongoose');

const userTypeSchema = mongoose.Schema({

    Type: {
        type: String,
        default: ""
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

const UserType = mongoose.model('UserType', userTypeSchema);

module.exports = UserType;
