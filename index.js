const express = require("express")
const app = express()
const { initializeDatabase } = require("./db/db.connect")

const Event = require("./models/events.model")

const cors = require("cors")

const corsOptions  = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  };
  
app.use(cors(corsOptions));

app.use(express.json())

initializeDatabase()

const getAllEvents = async() =>{
    try {
        const events = await Event.find()
        return events
    } catch (error) {
        console.log(error)
    }
}

async function createEvent(newEvent){
    try{
        const event = new Event(newEvent)
        const saveEvent = await event.save()
        return saveEvent
    } catch (error) {
    throw error 
    }
}

app.post("/events",async(req,res)=>{
    try {
        const savedEvent = await createEvent(req.body)
        res.status(201).json({message:"Event added successfully",event:savedEvent})
    } catch (error) {
        res.status(500).json({error:"Failed to add Event"})        
    }
})

app.get("/events", async (req,res)=>{
   try {
    const events = await getAllEvents()
    if(events){
    res.json(events)
    } else {
        res.status(404).json({error:"Event not found."})
    }
   } catch (error) {
    res.status(500).json()
   }
})

const getEventById = async(eventId) =>{
    try {
        const event = await Event.findOne({_id:eventId})
        return event
    } catch (error) {
        console.log(error)
    }
}

app.get("/events/:eventId",async(req,res)=>{
    try {
        const event = await getEventById(req.params.eventId)
        if(event){
            res.status(200).json(event)
        }else{
            res.status(404).json("Event not found")
        }
    } catch (error) {
        res.status(500).json("Unable to fetch data")
    }
})


const PORT = 3000
app.listen(PORT,()=>{
    console.log("Server is running on port",PORT)
})