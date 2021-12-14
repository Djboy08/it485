import gamesList from "../assets/json/gamesList.json";
import React, { useState, useEffect } from "react";

function SearchButton(props) {
  const [name, setName] = useState(props.name);
  const [values, setValues] = useState(props.values);
  const [gameValue, setGameValue] = useState("");
  const [searchButtonText, setSearchButtonText] = useState(name);
  const [searchList, setSearchList] = useState(props.values);
  const [isOpen, setIsOpen] = useState(false);


  const menuRef = React.useRef();
  const noItems = React.useRef();
  const wrapperRef = React.useRef(null);

  function useOutsideAlerter(ref) {
    useEffect(() => {
        if(props.overwrite){
            setGameValue(props.overwrite)
            setName(props.overwrite)
        }
        
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && isOpen == true) {
          menuRef.current.style.display = "none";
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }
  useOutsideAlerter(menuRef);

  function checkForGame(e) {
    setGameValue(e.target.value);
    if (e.target.value == "" || e.target.value == null || e.target.value == " ") {
      setSearchList(values);
      return;
    }
    const lowerCaseStr = e.target.value.toLowerCase();
    const results = searchList.data.filter((element) => {
      return element.toLowerCase().includes(lowerCaseStr) == true
        ? true
        : false;
    });
    let d = {
      data: results,
    };

    if (results.length === 0) {
      noItems.current.style.display = "block";
    } else {
      noItems.current.style.display = "none";
    }
    setSearchList(d);
  }

  function buildDropDown() {
    const group = searchList.data.map((itemName) => {
      const element = (
        <input
          type="button"
          key={itemName}
          className="dropdown-item"
          type="button"
          value={itemName}
          onClick={(e) => {
            menuRef.current.style.display = "none";
            setSearchButtonText(e.target.value);
            setGameValue(e.target.value);
            if(props.setValue){
              props.setValue(e.target.value);
            }

            }
          }
        />
      );

      return element;
    });
    return group;
  }
  //   buildDropDown(names);

  function onClick(e) {
    // e.preventDefault();
    setIsOpen(true);
    console.log(isOpen)
    menuRef.current.style.display = "block";
  }

  return (
    <>
      <div className="dropdown btn-group mb-2">
          
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdown_coins"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={onClick}
          disabled={props.disabled}
        >
          {props.overwrite ? props.overwrite : searchButtonText}
        </button>
        <div
          id="menu"
          className="dropdown-menu dropdown-menu-start dropdown-menu-dark"
          aria-labelledby="dropdown_coins"
          ref={(node) => {
            menuRef.current = node;
          }}
        >
          <form className="px-4 py-2">
            <input
              type="search"
              className="form-control"
              id="searchCoin"
              placeholder={name}
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
            {buildDropDown(values.data)}
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
