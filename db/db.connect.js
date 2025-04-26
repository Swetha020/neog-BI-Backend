const mongoose = require("mongoose")
require("dotenv").config();
const mongoUri = process.env.MONGODB

const initializeDatabase = async () =>{
   await mongoose
    .connect(mongoUri)
    .then(()=>{console.log("Database successfully connected")})
    .catch((error)=>{console.log("Failed to connect to database:",error)})
}

module.exports = {initializeDatabase}