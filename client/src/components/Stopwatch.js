import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function timeToString(time) {
    var diffDays = Math.floor(time / 86400000); // days
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);


  let formattedDD = diffDays.toString().padStart(2, "0");
  let formattedHH = hh.toString().padStart(2, "0");
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");

  return [formattedDD, formattedHH, formattedMM, formattedSS];
}

function Stopwatch() {
    const { isTimer,initialTime } = useSelector((state) => state.auth);
    const [dd, setdd] = useState("00");
  const [hr, sethr] = useState("00");
  const [mm, setmm] = useState("00");
  const [ss, setss] = useState("00");
  let startTime = Date.now();
  let elapsedTime = 0;
  let timerInterval;

  function start() {
    startTime = new Date(initialTime).getTime() || Date.now(); 
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      const t = timeToString(elapsedTime);
      setdd(t[0]);
      sethr(t[1]);
      setmm(t[2]);
      setss(t[3]);
    }, 1000);
  }

  useEffect(()=>{
    if(isTimer){
        start();
    }
  },[isTimer])

  return (
    <div class="container">
      <div id="time">
        <span class="digit" id="hr">
          {dd}
        </span>
        <span class="txt">DD</span>
        <span class="digit" id="min">
          {hr}
        </span>
        <span class="txt">Hr</span>
        <span class="digit" id="sec">
          {mm}
        </span>
        <span class="txt">Min</span>
        <span class="digit" id="count">
          {ss}
        </span>
        <span class="txt">Sec</span>
      </div>
    </div>
  );
}

export default Stopwatch;
