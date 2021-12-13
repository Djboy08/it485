import gamesList from "../assets/json/gamesList.json";
import React, { useState, useEffect } from "react";

function SearchButton(props) {
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

    if (results.length === 0) {
      noItems.current.style.display = "block";
    } else {
      noItems.current.style.display = "none";
    }
    setGamesL(d);
  }

  function buildDropDown() {
    const group = gamesL.data.map((gameName) => {
      const element = (
        <input
          type="button"
          key={gameName}
          className="dropdown-item"
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
    document.querySelector("#menu").style.display = "block";
  }

  return (
    <>
      <div className="dropdown btn-group">
        <button
          className="btn btn-secondary dropdown-toggle"
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
          className="dropdown-menu dropdown-menu-start"
          aria-labelledby="dropdown_coins"
        >
          <form className="px-4 py-2">
            <input
              type="search"
              className="form-control"
              id="searchCoin"
              placeholder="Search game"
              autoFocus="autofocus"
              autoComplete="off"
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
            className="dropdown-header"
            style={{ display: "none" }}
            ref={(node) => {
              noItems.current = node;
            }}
          >
            No game found
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchButton;
