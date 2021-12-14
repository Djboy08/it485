import gamesList from "../assets/json/gamesList.json";
import React, { useState, useEffect } from "react";

function Test(props) {
    const [title, setTitle] = useState(props.title);
    const [testing, setTesting] = useState(props.status);
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");
    useEffect(() => {
        console.log(props.status)
        if(props.status[title] == 0){
            setTag("bg-danger")
            setDescription("FAILED")
        }else if(props.status[title] == 1){
            setTag("bg-success")
            setDescription("PASSED!")
        }else if(props.status[title] == -1){
            setTag("bg-info")
            setDescription("Checking...")
        }
    })

  return (
    <>
      <div className="row justify-content-center">
        <b>{title}</b>
        <span class={`badge rounded-pill ${tag}`}>{
            description
        }</span>
      </div>
    </>
  );
}

export default Test;
