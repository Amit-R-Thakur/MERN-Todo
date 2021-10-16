const express=require("express");
const mongoose=require("mongoose");
const app=express();
const cors=require("cors")
app.use(cors())
app.use(express.json())
require("../server/database/connect/connect")
const port=process.env.port||4000
const todoData=require("./database/modules/todoData")

app.listen(port,()=>{
    console.log(`App is running on port no ${port}`)
})
app.get("/getAllData",async(req,res)=>{
 const data=await todoData.find({});
 console.log(data);
 res.send(data)

})
app.post("/getData",async(req,res)=>{
    console.log(req.body)
    const newtodoData=new todoData(req.body)
    await newtodoData.save()
    res.json("data saved")
   
})