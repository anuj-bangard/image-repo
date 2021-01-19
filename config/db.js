const mongoose = require("mongoose");
const db = require("./config.json");


const connectDB = async () => {
    await mongoose.connect(db.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    }).then(
    () => { console.log("Database Connected") },
    err => { 
        console.log(err)
        process.exit(1)
     }
  )}

  module.exports = connectDB;