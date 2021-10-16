import axios from "axios";
import React, { useEffect, useState } from "react";
import "./todo.css"
import TodoData from "./TodoData.jsx";


const Todo=()=>{
    const [setTodoData,setTodo]=useState({
        content:""
    } )
const [setFromDataBase,setDataBase]=useState([]);



 const handleData=(e)=>{
     const{name,value}=e.target;
     setTodo({...setTodo,[name]:value})
    //  console.log(setTodoData)

 }
 const sendDataToMongo=async()=>{
    const sendData= await axios.post("http://localhost:4000/getData",setTodoData).then((res)=>{
         alert(res.data)
         setTodo({...setTodoData,["content"]:""})
     }).catch((err)=>{console.log(err)})
    
 }
 useEffect(()=>{
    const getAllDataFromDataBase=async()=>{
        const data=await axios.get("http://localhost:4000/getAllData").catch((err)=>{console.log(err)})
        setDataBase(data.data)
    }
    
    getAllDataFromDataBase()
   
   
 },[setTodoData])




 





    return(
    <div className="mainDiv">
        <div className="todoDiv">
        <div className="headeDiv">
            <h1>
                MERN Todo App
            </h1>

        </div>
        <div className="addTodoDiv">
            <input type="text" onChange={handleData}  name="content" value={setTodoData.content}  maxLength="50" className="content" placeholder="Enter Your Todo Here!" autoFocus="on" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"></input>
            <button className="plus" onClick={sendDataToMongo}><i className="fas fa-plus"></i></button>

        </div>
        <div className="contentDiv">
            {setFromDataBase.map((props)=>{
                return(
             <TodoData
             content={props.content}
             />
             )
             

            })}
            
           

        </div>

        </div>
        

    </div>
    )
}

export default Todo