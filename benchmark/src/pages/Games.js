import { Button } from "react-bootstrap";
import { HomeCard, SearchButton } from "../components";
import logo from "../assets/logo.png";
import firstCardLogo from "../assets/cardImg1.jpg";
import secondCardLogo from "../assets/Who_We_aRe.jpg";
import thirdCardlogo from "../assets/Why_WE_Do_it.png";
import BootstrapSelect from "react-bootstrap-select-dropdown";
import { Dropdown, InputGroup, FormControl } from "react-bootstrap";
import gamesList from "../assets/js/gamesList.json";

import React, { useState, useEffect } from "react";

function Games(props) {


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


        <h1 style={{ color: "white" }}> Get started {Math.random() * 100} </h1>
        <SearchButton/>
      </div>
    </>
  );
}

export default Games;
