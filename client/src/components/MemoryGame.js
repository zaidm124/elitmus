import React, { useState, useEffect } from "react";
import { endRound } from "../redux/slices/auth";
import { useDispatch } from "react-redux";

let arrayCards = [
  "Gil",
  "Samantha",
  "Alice",
  "Angela",
  "Gil",
  "Samantha",
  "Alice",
  "Angela",
  "Jacob",
  "Peter",
  "Jacob",
  "Peter",
];
let len = arrayCards.length;
let c = 5;
let randindex1, randindex2;
while (c > 0) {
  randindex1 = Math.floor(Math.random() * len);
  randindex2 = Math.floor(Math.random() * len);
  [arrayCards[randindex1], arrayCards[randindex2]] = [
    arrayCards[randindex2],
    arrayCards[randindex1],
  ];
  c--;
}

const MemoryGame = ({ levelUp }) => {
  const dispatch = useDispatch();
  const [currentCards, setCurrentCards] = useState([]);
  const [openCards, setOpenCards] = useState([]);

  const cardClick = (i) => {
    console.log("clicked");
    if (
      openCards.find((e) => e === i) >= 0 ||
      currentCards.find((e) => e === i) >= 0
    ) {
      return;
    }

    setCurrentCards([...currentCards, i]);
  };

  useEffect(() => {
    if (currentCards.length === 2) {
      setTimeout(() => {
        if (arrayCards[currentCards[0]] === arrayCards[currentCards[1]]) {
          console.log("goes to same");
          setOpenCards([...openCards, currentCards[0], currentCards[1]]);
          setCurrentCards([]);
        } else {
          setCurrentCards([]);
        }
      }, 500);
    }
  }, [currentCards]);

  console.log(currentCards);
  console.log("open", openCards);
  useEffect(() => {
    if (openCards.length === 12) {
      console.log("game over");
      levelUp();
      dispatch(endRound({level:3}));
    }
  }, [openCards]);

  return (
	<>
    <div className="memory-matrix-container">
      <h1>Round 4 - Memory Game</h1>
      <div className="game-board">
        {arrayCards.map((item, ind) => (
          <div className="card" onClick={() => cardClick(ind)}>
            {openCards.find((e) => e === ind) >= 0 ||
            currentCards.find((t) => t === ind) >= 0
              ? item
              : null}
          </div>
        ))}
      </div>
      {/* <div id="time"> Time: </div> */}
    </div>
      <div className="instructions">
        <h4>Instructions</h4>
        <ul>
          <li>
            This game is based on Memory.
          </li>
          <li>
			Match the cards with the same name.
		  </li>
		  <li>
			Round will be completed when all cards have been matched.
		  </li>
        </ul>
      </div>
	  </>
  );
};

export default MemoryGame;
