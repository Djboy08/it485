import { Button } from "react-bootstrap";
import { HomeCard } from "../components";
import logo from "../assets/logo.png";
import firstCardLogo from "../assets/cardImg1.jpg";
import secondCardLogo from "../assets/Who_We_aRe.jpg";
import thirdCardlogo from "../assets/Why_WE_Do_it.png";
import BootstrapSelect from "react-bootstrap-select-dropdown";
import { Dropdown, InputGroup, FormControl } from "react-bootstrap";
import gamesList from "../assets/js/gamesList.json";

import React, { useState, useEffect } from "react";

function Games(props) {
  const [gameValue, setGameValue] = useState("");
  const [gamesL, setGamesL] = useState(gamesList);
  const menuItemsRef = React.useRef();
  const noItems = React.useRef();

  useEffect(() => {
    //   setGamesL(gamesList);
    // menuItemsRef.current. = buildDropDown(gamesList.data);
  });

  function checkForGame(e) {
    const str = e.target.value;
    setGameValue(str);
    if (str == "" || str == null || str == " ") {
      setGamesL(gamesList);
      return;
    }
    const lowerCaseStr = str.toLowerCase();
    const results = gamesList.data.filter((game) => {
      return (
        game.substring(0, lowerCaseStr.length).toLowerCase() == lowerCaseStr
      );
    });
    let d = {
      data: results,
    };

    if(results.length === 0){
      noItems.current.style.display = "block";
    }else{
        noItems.current.style.display = "none";
    }
    console.log(results);
    setGamesL(d);
  }

  function buildDropDown() {
    const group = gamesL.data.map((gameName) => {
      const element = (
        <input
          type="button"
          class="dropdown-item"
          type="button"
          value={gameName}
          onClick={(e) => {
            document.querySelector("#menu").style.display = "none";
            setGameValue(e.target.value);
          }}
        />
      );

      return element;
    });
    return group;
  }
  //   buildDropDown(names);

  function onClick(e) {
    e.preventDefault();
    console.log("test");
    document.querySelector("#menu").style.display = "block";
  }

  //   $('#menuItems').on('click', '.dropdown-item', function(){
  //     $('#dropdown_coins').text($(this)[0].value)
  //     $("#dropdown_coins").dropdown('toggle');
  // })

  return (
    <>
      <div
        class="container"
        style={{
          backgroundColor: "#31353c",
          borderRadius: "10px",
          border: "1px solid #31353c",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        {/* <img src={logo} className="App-logo py-5 my-2" alt="logo" />
        <hr class="solid" style={{
            color: "white",
            marginTop: "20px",
            marginBottom: "20px",
        }} /> */}

        <h1 style={{ color: "white" }}> Get started {Math.random() * 100} </h1>
        <div class="dropdown btn-group">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdown_coins"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={onClick}
          >
            Search
          </button>
          <div
            id="menu"
            class="dropdown-menu dropdown-menu-start"
            aria-labelledby="dropdown_coins"
          >
            <form class="px-4 py-2">
              <input
                type="search"
                class="form-control"
                id="searchCoin"
                placeholder="Search game"
                autofocus="autofocus"
                onChange={checkForGame}
                value={gameValue}
              />
            </form>

            <div
              id="menuItems"
              style={{
                maxHeight: "20rem",
                overflowY: "auto",
              }}
            >
              {buildDropDown(gamesList.data)}
            </div>
            <div
              id="empty"
              class="dropdown-header"
              style={{display: "none"}}
              ref={(node) => {
                noItems.current = node;
              }}
            >
              No game found
            </div>
          </div>
        </div>
        {/* <Button variant="dark" size="lg">
          Press Me!1
        </Button>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Search
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-0">
              <InputGroup className="mb-1">
                <FormControl
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
      </div>
    </>
  );
}

export default Games;
