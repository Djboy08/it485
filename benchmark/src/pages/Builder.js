import { Button } from "react-bootstrap";
import gamesList from "../assets/json/gamesList.json";
import gpuList from "../assets/json/gpuList.json";
import cpuList from "../assets/json/cpuList.json";
import { SearchButton, SearchBar, Modal } from "../components";
import logo from "../assets/logo.png";

import React, { useState, useEffect, useRef } from "react";

function Builder(props) {
  const partListButton = React.useRef();
  let [gpu, setGpu] = useState("");
  let [cpu, setCpu] = useState("");
  let [ram, setRam] = useState("");
  let [guid, setGuid] = useState("");
  let [modalVisibility, setModalVisibility] = useState("hidden");
//   const [value, setValue] = useChromeStorageLocal('guids', []);

  useEffect(() => {
      console.log("AA")
    if (props.match.params.guid) {
      setGuid(props.match.params.guid);
      console.log("working")
      const url =
        "https://7fazqgnr2l.execute-api.us-east-1.amazonaws.com/queryPartList?guid=" +
        props.match.params.guid;

      fetch(url, {
        method: "GET",
        // mode: 'no-cors'
      })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          return data ? JSON.parse(data) : {};
        })
        .then((json) => {
          const guid = json["guid"];
          setGuid(guid);
          setGpu(json["gpuModel"]);
          setCpu(json["cpuModel"]);
          setRam(json["ram"]);
        })
        .catch((error) => {
          return error;
        });
    }
  }, [props.match.params.guid]);
  const gpuRef = React.useRef();
  const cpuRef = React.useRef();
  const ramRef = React.useRef();

  function createPartList(e) {
    // const Http = new XMLHttpRequest();
    const url =
      "https://7fazqgnr2l.execute-api.us-east-1.amazonaws.com/insertPartList?cpuModel=" +
      cpu +
      "&gpuModel=" +
      gpu +
      "&ram=" +
      ram;
    console.log(url);
    const data = {
      cpuModel: cpu,
      gpuModel: gpu,
      ram: ram,
    };
    return fetch(url, {
      method: "POST",
      // mode: 'no-cors'
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        return data ? JSON.parse(data) : {};
      })
      .then((json) => {
        const guid = json["guid"];

        // setValue((prev)=>{prev.append(guid)});
        // console.log(value);
        setGuid(guid);
        setModalVisibility("block");
      })
      .catch((error) => {
        return error;
      });
    // Http.open("POST", url);
    // Http.setRequestHeader("Access-Control-Allow-Origin", "*")
    // Http.send();

    // Http.onreadystatechange = (e) => {
    //   console.log(Http.responseText);
    // };
  }

  return (
    <>
      <Modal
        guid={guid}
        setModalVisibility={setModalVisibility}
        modalVisibility={modalVisibility}
      />
      <div className="container">
        <h1 style={{ color: "white", marginTop: "20px" }}> Part Builder </h1>
        <div className="row d-flex custom-container" style={{ color: "white" }}>
          <div className="col">
            <h2 style={{ color: "white", marginTop: "20px" }}> Components </h2>
            <label
              className="form-label"
              style={{
                color: "white",
                fontWeight: "bold",
                marginRight: "2rem",
              }}
            >
              GPU:
            </label>
            <SearchButton
              name="Search GPUs"
              values={gpuList}
              setValue={setGpu}
              overwrite={gpu}
            />

            <br />

            <label
              className="form-label"
              style={{
                color: "white",
                fontWeight: "bold",
                marginRight: "2rem",
              }}
            >
              CPU:
            </label>
            <SearchButton
              name="Search CPUs"
              values={cpuList}
              setValue={setCpu}
              overwrite={cpu}
            />
            <br />
            <label
              className="form-label my-auto"
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              RAM
            </label>
            <div className="input-group mb-3 mx-auto" style={{ maxWidth: "17rem" }}>
              <input
                type="text"
                className="form-control"
                placeholder="ram"
                aria-label="ram"
                aria-describedby="basic-addon1"
                value={ram}
                onChange={(e) => setRam(e.target.value)}
              />
              <span
                className="input-group-text bg-dark text-white"
                id="basic-addon1"
              >
                GB
              </span>
            </div>
            <button type="button" className="btn btn-dark" onClick={createPartList}>
              Create Part List
            </button>
          </div>
          {/* <div className="col"></div> */}
        </div>
      </div>
    </>
  );
}

export default Builder;
