const mongoose =require("mongoose");

const todoSchema=mongoose.Schema({
    content:String
})
const todomodule=mongoose.model("MERNApp",todoSchema)
 module.exports=todomodule