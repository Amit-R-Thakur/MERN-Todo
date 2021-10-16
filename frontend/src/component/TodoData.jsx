import React from "react";

const TodoData=(data)=>{
    return(
        <div className="mainContent">
        <div className="realText">{data.content}</div>
        <div className="task"><i className="far fa-edit" ></i><i className="far fa-trash-alt"></i></div>
       </div>
    )
}
export default TodoData