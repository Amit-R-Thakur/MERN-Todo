import axios from "axios";
import React, { useEffect, useState } from "react";
import "./todo.css";

const Todo = () => {
  const [setTodoData, setTodo] = useState({});
  const [setFromDataBase, setDataBase] = useState([]);

  const handleData = (e) => {
    const { name, value } = e.target;
    setTodo({ ...setTodo, [name]: value });
    // console.log(setTodoData);
  };
  const sendDataToMongo = async (tempdata) => {
    //   console.log(tempdata)
    await axios
      .post("http://localhost:4000/getData", tempdata)
      .then((res) => {
        // alert(res.data);
        setTodo({ content: " " });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllDataFromDataBase = async () => {
    const data = await axios
      .get("http://localhost:4000/getAllData")
      .catch((err) => {
        console.log(err);
      });
    //   console.log(data)
    setDataBase(data.data);
  };
  useEffect(() => {
    getAllDataFromDataBase();
  }, [setTodoData]);

  ///delete data from database....
  const deleteData = async (e) => {
    const { accessKey } = e.target;
    // console.log(e);
    // console.log(accessKey);
    await axios
      .delete(`http://localhost:4000/deletedata/${accessKey}`)
      .then((res) => {
        // console.log(res.data);
        getAllDataFromDataBase();
      })
      .catch((err) => {});
  };

  //update functions.................
  const updateDataToMongo = async (tempData, id) => {
    setTodo({ content: " " });
    //   console.log(tempData)
    try {
      const tempId = id.accessKey;
      await axios.patch(`http://localhost:4000/updatetodo${tempId}`, tempData);
      BtnHandler({ onClickEvent: sendDataToMongo, iconClass: "fas fa-plus" });
      
      getAllDataFromDataBase();
      
    } catch (err) {
      console.log(err);
    }
  };

  //usestate for change input field and onclick event
  const [btnHandle, BtnHandler] = useState({
    onClickEvent: sendDataToMongo,
    iconClass: `fas fa-plus`,
    uniqueKey: "",
  });

  const update = async (e) => {
    const { accessKey } = e.target;
    BtnHandler({
      onClickEvent: updateDataToMongo,
      iconClass: "far fa-save",
      uniqueKey: { accessKey },
    });
    try {
      const data = await axios.get(
        `http://localhost:4000/getDataById${accessKey}`
      );
      setTodo(data.data);

      // console.log(data)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mainDiv">
      <div className="todoDiv">
        <div className="headeDiv">
          <h1>MERN Todo App</h1>
        </div>
        <div className="addTodoDiv">
          <input
            type="text"
            onChange={handleData}
            name="content"
            value={setTodoData.content}
            maxLength="50"
            className="content"
            placeholder="Enter Your Todo Here!"
            autoFocus="on"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          ></input>
          <button
            className="plus"
            onClick={() => {
              btnHandle.onClickEvent(setTodoData, btnHandle.uniqueKey);
            }}
          >
            <i className={btnHandle.iconClass}></i>
          </button>
        </div>
        <div className="contentDiv">
          {setFromDataBase.map((data) => {
            //   console.log(data)
            return (
              <div className="mainContent">
                <div className="realText">{data.content}</div>
                <div className="task">
                  <i
                    onClick={update}
                    accessKey={data._id}
                    className="far fa-edit"
                  ></i>
                  <i
                    accessKey={data._id}
                    onClick={deleteData}
                    className="far fa-trash-alt"
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Todo;
