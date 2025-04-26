const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    startDate: {type: String, required: true},
    startTime: {type: String, required:true},
    endDate: {type: String, required: true},
    endTime: {type: String, required:true},
    location: {type: String, required:true},
    fee:{type:Number},
    hostedBy: {type:String, required:true},
    details:{type:String, required:true},
    dressCode: {type:String},
    ageRestrictions: {type:Boolean, required:true},
    eventTags: {type:[String],required:true},
    isOnlineEvent: {type:Boolean, required:true},
    imgUrl: {type:String},
    speakers: [
        {
            name: { type: String, required: true },
            designation: { type: String, required: true },
            picture: { type: String } 
        }
    ]
})

const Event = mongoose.model("Event",eventSchema)

module.exports = Event