const mongoose = require("mongoose")

const candidateSchema = new mongoose.Schema({
    cname : {
        type : String,
    },
    address : {
        type : String,
    },
    city : {
        type : String,
    },
    pincode : {
        type : String,
    },
    age : {
        type : String,
    },
    slogans : {
        type : String,
    },
    partyName : {
        type : String,
    },
    votes : {
        type : [String],
        default : []
    },
    imageUrl : {
        type : String,
    },
    visible : {
        type : String,
    },
    createdByEmail : {
        type : String,
    },
})

module.exports = mongoose.model("Candidate" , candidateSchema);