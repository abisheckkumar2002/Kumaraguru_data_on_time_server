const mongoose = require('mongoose');

const criteriaTypeSchema =mongoose.Schema({

    criteriaType: {
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

const CriteriaType = mongoose.model('CriteriaType', criteriaTypeSchema);

module.exports = CriteriaType;