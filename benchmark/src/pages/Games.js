import { Button } from "react-bootstrap";
import { HomeCard, SearchButton, SearchBar, Test } from "../components";
import logo from "../assets/logo.png";
import firstCardLogo from "../assets/cardImg1.jpg";
import secondCardLogo from "../assets/Who_We_aRe.jpg";
import thirdCardlogo from "../assets/Why_WE_Do_it.png";
import BootstrapSelect from "react-bootstrap-select-dropdown";
import { Dropdown, InputGroup, FormControl } from "react-bootstrap";
import images from "../assets/index.js";
import gamesList from "../assets/json/gamesList.json";
import gpuList from "../assets/json/gpuList.json";
import cpuList from "../assets/json/cpuList.json";
import React, { useState, useEffect } from "react";

const gameNameToImage = {
  "Halo Infinte": images.Halo,
  "Apex Legends": images.Apex,
  "Counter-Strike: Global Offensive": images.Csgo,
  "Destiny 2": images.Destiny2,
  "Dota 2": images.Dota2,
  "Escape From Tarkov": images.EFT,
  Fortnite: images.Fortnite,
  "Grand Theft Auto V": images.GTA,
  "Genshin Impact": images.Genshin,
  "League Of Legends": images.LoL,
  Minecraft: images.Minecraft,
  Overwatch: images.Overwatch,
  "PUBG: Battlegrounds": images.Pubg,
  "Rocket League": images.RocketLeague,
  "Rainbow Six Siege": images.R6,
  Rust: images.Rust,
  Valorant: images.Valorant,
  "Call Of Duty: Vanguard": images.Vanguard,
  "World Of Warcraft": images.WoW,
};

function Games(props) {
  //   $('#menuItems').on('click', '.dropdown-item', function(){
  //     $('#dropdown_coins').text($(this)[0].value)
  //     $("#dropdown_coins").dropdown('toggle');
  // })
  const [partList, setPartList] = useState({});
  const [game, setGame] = useState({});
  const [l, setL] = useState({ ram: -2, cpu: -2, gpu: -2 });
  const [benchmarkLoadingbarValue, setBenchmarkLoadingbarValue] =
    useState("0%");
  const [partLoadingbarValue, setPartLoadingbarValue] = useState("0%");

  const codeInput = React.createRef();
  const partProgressBar = React.createRef();

  function compare() {
    if (codeInput.current.value.length <= 0) {
      alert("Please enter a code");
      return;
    } else if (Object.keys(game).length == 0) {
      alert("Invalid Game");
      return;
    } else if (Object.keys(partList) == 0) {
      alert("Please select a valid part list");
      return;
    }

    const url =
      "https://7fazqgnr2l.execute-api.us-east-1.amazonaws.com/comparePartList?guid=" +
      codeInput.current.value +
      "&gameName=" +
      game;

    fetch(url, {
      method: "GET",
      // mode: 'no-cors'
    })
      .then((response) => {
        setBenchmarkLoadingbarValue("10%");
        return response.text();
      })
      .then((data) => {
        setBenchmarkLoadingbarValue("15%");
        return data ? JSON.parse(data) : {};
      })
      .then((json) => {
        console.log(json);
        let r = json["ram"] == true ? 1 : 0;
        let c = json["cpu"] == true ? 1 : 0;
        let g = json["gpu"] == true ? 1 : 0;
        setL({ ram: -1, cpu: -1, gpu: -1 });
        setBenchmarkLoadingbarValue("30%");
        setTimeout(() => {
          setBenchmarkLoadingbarValue("100%");
        }, 1000);
        setTimeout(() => {
          setBenchmarkLoadingbarValue("0%");
          setL({ ram: r, cpu: c, gpu: g });
          console.log(json);
          console.log(r, c, g)
        }, 2000);
      })
      .catch((error) => {
        return error;
      });
  }

  function lookupPartList(e) {
    const url =
      "https://7fazqgnr2l.execute-api.us-east-1.amazonaws.com/queryPartList?guid=" +
      codeInput.current.value;

    fetch(url, {
      method: "GET",
      cache: "no-cache",
      // mode: 'no-cors'
    })
      .then((response) => {
        // setPartLoadingbarValue("100%");
        return response.text();
      })
      .then((data) => {
        return data ? JSON.parse(data) : {};
      })
      .then((json) => {
        if(json == null) return;
        setPartList(json);
        setPartLoadingbarValue("100%");
        setTimeout(() => {
          setPartLoadingbarValue("0%");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  const s = {
    backgroundColor: "#31353c",
    borderRadius: "10px",
    border: "1px solid #31353c",
    padding: "20px",
    marginTop: "20px",
    marginLeft: "10px",
    marginRight: "10px",
  };

  return (
    <>
      <div className="container">
        <h1 style={{ color: "white", marginTop: "20px" }}> Can you run it? </h1>
        <div className="row d-flex" style={{ color: "white" }}>
          <div className="col-12 col-md-4 my-auto">
            <div
              className="custom-container vertical-center"
              style={{ minHeight: "40rem" }}
            >
              <div className="partList " style={{}}>
                <h1 style={{ color: "white" }}> User Part List </h1>

                <div className="input-group mx-auto" style={{ maxWidth: "17rem" }}>
                  <span
                    className="input-group-text bg-dark text-white border-dark"
                    id="basic-addon1"
                  >
                    Part List Code
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Code"
                    aria-label="Code"
                    aria-describedby="basic-addon1"
                    ref={(node) => {
                      codeInput.current = node;
                    }}
                  />
                  <button
                    className="btn bg-dark text-white border-light"
                    type="button"
                    id="button-addon2"
                    onClick={lookupPartList}
                  >
                    {">"}
                  </button>
                </div>
                <div className="progress" style={{ height: "3px" }}>
                  <div
                    className="progress-bar progress-bar-striped bg-danger progress-bar-animated"
                    role="progressbar"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: partLoadingbarValue }}
                    ref={(node) => {
                      partProgressBar.current = node;
                    }}
                  ></div>
                </div>
                <label
                  className="form-label"
                  style={{
                    color: "white",
                  }}
                >
                  GPU
                </label>
                <br />
                <SearchButton
                  name="Search GPUs"
                  values={gpuList}
                  disabled
                  overwrite={partList.gpuModel}
                />
                <br />
                <label
                  className="form-label"
                  style={{
                    color: "white",
                  }}
                >
                  CPU
                </label>
                <br />
                <SearchButton
                  name="Search CPUs"
                  values={cpuList}
                  disabled
                  overwrite={partList.cpuModel}
                />

                <br />
                <label
                  className="form-label"
                  style={{
                    color: "white",
                  }}
                >
                  RAM
                </label>
                <div
                  className="input-group mb-3 mx-auto"
                  style={{ maxWidth: "17rem" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ram"
                    aria-label="ram"
                    aria-describedby="basic-addon1"
                    disabled
                    readOnly
                    value={partList.ram ? partList.ram : ""}
                  />
                  <span
                    className="input-group-text bg-dark text-white"
                    id="basic-addon1"
                  >
                    GB
                  </span>

                  <br />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 my-auto">
            <div className="custom-container">
              <button onClick={compare} type="button" className="btn btn-dark">
                Benchmark Game
                <div
                  className="progress"
                  style={{
                    height: "3px",
                  }}
                >
                  <div
                    className="progress-bar progress-bar-striped bg-danger progress-bar-animated"
                    role="progressbar"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: benchmarkLoadingbarValue }}
                  ></div>
                </div>
              </button>
              <h1 style={{ color: "white" }}> Benchmark </h1>
              <div className="tests">
                <Test title={"gpu"} status={l} />
                <Test title={"cpu"} status={l} />
                <Test title={"ram"} status={l} />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 my-auto">
            <div className="custom-container" style={{ minHeight: "40rem" }}>
              <h1 style={{ color: "white" }}> Game Selector </h1>
              <SearchBar
                name="Search game"
                values={gamesList}
                game={game}
                setGame={setGame}
              />
              <div
                className={
                  "card bg-dark mx-auto my-5" +
                  ((Object.keys(game).length == 0) | !gameNameToImage[game]
                    ? " d-none"
                    : " d-block")
                }
                style={{ width: "18rem" }}
              >
                <img
                  src={gameNameToImage[game]}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <p className="card-text">Image of game</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Games;
