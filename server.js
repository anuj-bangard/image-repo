const express = require("express");
const bodyParser = require("body-parser");
const DBconnection = require("./config/db")
var cors = require('cors')
const app = express();

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(express.json({extended:false}));
/**database connection */
DBconnection();

app.use(cors())

app.use("/",require("./routes/login"))
app.use("/",require("./routes/register"))
app.use("/",require("./routes/upload"))
const port = process.env.PORT || 5000

app.listen(port,function(){
    console.log("Server Running at port " + port);
})
