const mongoose = require("mongoose")

const votedSchema = new mongoose.Schema({
    name : {
        type : String,
    }
})

module.exports = mongoose.model("Voted" , votedSchema);