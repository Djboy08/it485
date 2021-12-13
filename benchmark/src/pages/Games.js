import { Button } from "react-bootstrap";
import { HomeCard, SearchButton, SearchBar } from "../components";
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

                <div
                  class="input-group mx-auto"
                  style={{ maxWidth: "17rem" }}
                >
                  <span
                    class="input-group-text bg-dark text-white border-dark"
                    id="basic-addon1"
                  >
                    Part List Code
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Code"
                    aria-label="Code"
                    aria-describedby="basic-addon1"
                  />
                  <button
                    class="btn bg-dark text-white border-light"
                    type="button"
                    id="button-addon2"
                  >
                    {">"}
                  </button>
                  
                </div>
                <div className="progress" style={{height: "3px"}}>
                  <div
                    className="progress-bar progress-bar-striped bg-danger progress-bar-animated"
                    role="progressbar"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "25%" }}
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
                <SearchButton name="Search GPUs" values={gpuList} disabled />
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
                <SearchButton name="Search CPUs" values={cpuList} disabled />

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
                  class="input-group mb-3 mx-auto"
                  style={{ maxWidth: "17rem" }}
                >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="ram"
                    aria-label="ram"
                    aria-describedby="basic-addon1"
                    disabled
                    readOnly
                  />
                  <span
                    class="input-group-text bg-dark text-white"
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
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped bg-danger progress-bar-animated"
                  role="progressbar"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: "25%" }}
                ></div>
              </div>
              <h1 style={{ color: "white" }}> Benchmark </h1>
              Content hereContent hereContent hereContent hereContent here
              Content hereContent hereContent hereContent hereContent here
              Content hereContent hereContent hereContent hereContent here
            </div>
          </div>
          <div className="col-12 col-md-4 my-auto">
            <div className="custom-container" style={{ minHeight: "40rem" }}>
              <h1 style={{ color: "white" }}> Game Selector </h1>
              <SearchBar name="Search game" values={gamesList} />

              <div className="card bg-dark mx-auto my-3">
                <img src={logo} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
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
