import React, { useState, useEffect } from "react";
import SpotDifference from "./SpotDifference";
import MemoryGame from "./MemoryGame";
import Instapost from "./Instapost";
import Observation from "./Observation";
import SolveMurder from "./SolveMurder";
import { useSelector, useDispatch } from "react-redux";
import {
  resumeGame,
  resetGame,
  updateLevel,
  startRound,
  endRound,
  updateAuthData,
} from "../redux/slices/auth";
import Quiz from "./Quiz";
import Hint1 from "./Hint1";
import Hint4 from "./Hint4";
import Hint5 from "./Hint5";
import Button from "react-bootstrap/esm/Button";
import Description from "./Description";
import LeaderBoard from "./admin/LeaderBoard";

const mystry = [
  {
    level: 0,
    content: <Description />,
  },
  {
    level: 1,
    content: <Hint1 />,
  },
  {
    level: 3,
    content: <Hint4 />,
  },
  {
    level: 4,
    content: <Hint5 />,
  },
];

export default function Dashboard({ status, setStatus }) {
  // const [level, setLevel] = useState(0)
  const [gameon, setGameon] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();
  console.log("gameon: ", gameon);

  const { initialLevel, level, completed } = useSelector((state) => state.auth);
  useEffect(() => {
    if (level == 0) {
      setGameon(false);
    } else {
      setGameon(true);
    }
  }, []);
  console.log("level: ", level);

  useEffect(() => {
    if (initialLevel && initialLevel > 0) {
      setIsModal(true);
    }
  }, [initialLevel]);

  const levelUp = () => {
    // setLevel((level) => level + 1)
    console.log(level);
    const l = {
      level: level + 1,
    };
    dispatch(updateLevel(l));
    setGameon(false);
  };

  const updateLevels = (i) => {
    if (i === 0) {
      dispatch(resumeGame());
      setIsModal(false);
    } else {
      // dispatch(resetGame())
      dispatch(updateLevel({ level: 0 }));
      setGameon(false);
      setIsModal(false);
    }
  };
  console.log("At Level:", level);

  if (completed && !status) {
    return (
      <div className="dashboard-container">
        <div className="game-container">
          <h3 style={{color:"black"}}>Congratulations!!! You have completed the game.</h3>
          <p>You can view the Leaderboard to check you rank.</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="dashboard-container">
        {isModal ? (
          <div className="dashboard-modal">
            <h4>
              Do you want to resume from your previous progress or reset ?
            </h4>
            <Button onClick={() => updateLevels(0)}>Resume</Button>
            <Button onClick={() => updateLevels(1)}>Reset</Button>
          </div>
        ) : null}
        {/* <h3>welcome</h3> */}
        {/* <Quiz levelUp={levelUp} /> */}
        {status == 1 ? (
          <LeaderBoard />
        ) : gameon === true ? (
          <div className="game-container">
            {level === 0 ? (
              <Instapost setGameon={setGameon} levelUp={levelUp} />
            ) : null}
            {level === 1 ? <SpotDifference levelUp={levelUp} /> : null}
            {level === 2 ? (
              <Observation
                setGameon={setGameon}
                gameOn={gameon}
                levelUp={levelUp}
              />
            ) : null}
            {level === 3 ? <MemoryGame levelUp={levelUp} /> : null}
            {level === 4 ? <SolveMurder setNavStatus={setStatus} /> : null}
          </div>
        ) : (
          <>
            {level > 0 ? (
              <h1>Congratulations on completing Round {level}</h1>
            ) : null}
            <div className="mystry-clues-container">
              <p>
                {level === 0 ? mystry[0].content : null}
                {level === 2 ? mystry[1].content : null}
                {level === 3 ? mystry[2].content : null}
                {level === 4 ? mystry[3].content : null}
              </p>
              <Button
                onClick={() => {
                  setGameon(!gameon);
                  if (level == 0) {
                    dispatch(startRound({ level: 0 }));
                  }
                }}
              >
                Proceed
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }
}
