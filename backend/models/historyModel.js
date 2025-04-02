const mongoose = require("mongoose")

const historySchema = new mongoose.Schema({
    userId : String,
    pdfLink : String,
    code : String,
    type :String,
    fileName : String
},{
    timestamps : true
})

const historyModel = mongoose.model("history",historySchema)

module.exports = historyModel