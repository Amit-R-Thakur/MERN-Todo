const express=require("express");
const mongoose=require("mongoose");
const app=express();
const cors=require("cors")
app.use(cors())
app.use(express.json())
require("../server/database/connect/connect")
const port=process.env.port||4000
const todoData=require("./database/modules/todoData")


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

app.delete("/deletedata/:id",async(req,res)=>{
    try{
        const deletData=await todoData.findByIdAndRemove({_id:req.params.id})
        res.send(deletData)

    }
    
    catch(err){
        console.log(err)

    }
})
app.get("/getDataById:id",async(req,res)=>{
       console.log(req.params)
    res.send(await todoData.findById({_id:req.params.id}))
})

app.patch("/updatetodo:id",async(req,res)=>{
    console.log(req.params.id)
    console.log(req.body)
    res.send(await todoData.findByIdAndUpdate({_id:req.params.id},{$set:{content:req.body.content}}))
})

app.listen(port,()=>{
    console.log(`App is running on port no ${port}`)
})