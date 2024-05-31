const mongoose = require("mongoose")

exports.ConnectDB = ()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{console.log("Db Connected Successfully");}).catch((err)=>{console.log("Db connection Error ", err);})
}