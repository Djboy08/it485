import { Button } from "react-bootstrap";
import { HomeCard, SearchButton } from "../components";
import logo from "../assets/logo.png";
import firstCardLogo from "../assets/cardImg1.jpg";
import secondCardLogo from "../assets/Who_We_aRe.jpg";
import thirdCardlogo from "../assets/Why_WE_Do_it.png";
import BootstrapSelect from "react-bootstrap-select-dropdown";
import { Dropdown, InputGroup, FormControl } from "react-bootstrap";
import gamesList from "../assets/json/gamesList.json";
import gpuList from "../assets/json/gpuList.json";
import cpuList from "../assets/json/cpuList.json";

import React, { useState, useEffect } from "react";

function Games(props) {
  //   $('#menuItems').on('click', '.dropdown-item', function(){
  //     $('#dropdown_coins').text($(this)[0].value)
  //     $("#dropdown_coins").dropdown('toggle');
  // })

  return (
    <>
      <div
        className="container"
        style={{
          backgroundColor: "#31353c",
          borderRadius: "10px",
          border: "1px solid #31353c",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <h1 style={{ color: "white" }}> Can you run it? </h1>
        <SearchButton name="Search game" values={gamesList} />
        <SearchButton name="Search GPUs" values={gpuList} />
        <SearchButton name="Search CPUs" values={cpuList} />
      </div>
    </>
  );
}

export default Games;
