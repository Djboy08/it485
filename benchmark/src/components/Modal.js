import gamesList from "../assets/json/gamesList.json";
import React, { useState, useEffect } from "react";

function Modal(props) {
  const [guid, setGuid] = useState(props.guid);
  const modalRef = React.createRef();

  function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  function toggleVisibility(){
      props.setModalVisibility(props.modalVisibility === "block" ? "none" : "block");
  }


  return (
    <>
      <div className="modal bg-dark" tabIndex="-1"
      style={{display: props.modalVisibility}}
      ref={(node)=>{modalRef.current = node}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Part List Code</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={toggleVisibility}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Here is your part list code, use this on the games page to
                benchmark your PC
                <br/>
                <b>CODE<br/>{props.guid}</b>
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={toggleVisibility}
              >
                Close
              </button>
              <button 
              onClick={() => copyTextToClipboard(props.guid)}
              type="button" className="btn btn-primary">
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
