import React, { useState, useEffect } from "react";
import original from "../assets/images/original.jpg";
import modified from "../assets/images/modified.jpg";
import insta from "../assets/images/round1-qrcode.png";
import Button from "react-bootstrap/esm/Button";
import { useDispatch } from "react-redux";
import { endRound, startRound } from "../redux/slices/auth";

const Instapost = ({ levelUp }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Round 1</h1>
      <div id="spot_wrap">
        <img
          name="modified"
          src={insta}
          height="300"
          border="0"
          usemap="#original"
          className="difference-img"
        />
      </div>
      <h5>Scan the QR code to find the first part of the story.</h5>
      <Button
        onClick={() => {
          levelUp();
          dispatch(endRound({level:0}));
          dispatch(startRound({level:1}));
        }}
      >
        Proceed to Round 2
      </Button>
    </div>
  );
};

export default Instapost;
