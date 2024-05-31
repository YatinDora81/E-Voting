const express = require("express")
const app = express();
require("dotenv").config();
const {ConnectDB} = require("./config/database")
const router = require("./routes/allRoutes")
const cors = require("cors")

app.use(cors())
app.use(express.json());
app.use( "/api/v1", router);

const PORT = process.env.PORT

app.listen(PORT , ()=>{
    console.log(`App is running at ${PORT} port`);
})

ConnectDB()

app.get("/",(req,res)=>{
    res.send("Home Route")
})