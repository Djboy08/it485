import gamesList from "../assets/json/gamesList.json";
import React, { useState, useEffect } from "react";

function SearchBar(props) {
  const [name, setName] = useState(props.name);
  const [values, setValues] = useState(props.values);
  const menuRef = React.useRef();
  const noItems = React.useRef();
  const wrapperRef = React.useRef(null);


  return (
    <>
      <label for="exampleDataList" className="form-label" style={{
          color: "white",
      }}>
        Search Game
      </label>
      <input
        className="form-control"
        list="datalistOptions"
        id="exampleDataList"
        placeholder="Type to search..."
        onChange={(e)=>{props.setGame(e.target.value)}}
      />
      <datalist id="datalistOptions">
          {values.data.map((item, index) => (
              <option key={index} value={item}/>
            ))}
        {/* <option value="San Francisco" />
        <option value="New York" />
        <option value="Seattle" />
        <option value="Los Angeles" />
        <option value="Chicago" /> */}
      </datalist>
    </>
  );
}

export default SearchBar;
