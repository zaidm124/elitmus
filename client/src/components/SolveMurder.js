// options: ["Gil", "Samantha", "Alice", "Angela", "Jacob", "Peter"],import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import q1 from "../assets/images/q1.jpg";
import { endRound, startRound } from "../redux/slices/auth";
import { useDispatch } from "react-redux";

const ques = {
  question: "Who killed Mr. Roddy ?",
  answer: "angela",
};

let intervalId = null;
const SolveMurder = ({ levelUp, setGameon, gameOn }) => {
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState(null);
  const [timer, setTimer] = useState(10);
  const [answer, setAnswer] = useState("");
  const [attemps, setAttemps] = useState(2);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (answer === "") {
      return;
    } else {
      var ans = answer;
      ans = ans.toLowerCase();
      if (ans === ques.answer) {
        setMessage("Congratulations! You won");
        dispatch(endRound({level:4}));
        // setStatus(2);
      } else {
        setMessage("Incorrect Answer");
        setAttemps(attemps - 1);
      }
    }
  };

  console.log(timer);
  return (
    <div>
      {status === 0 ? (
        <div>
          <h1>Round 5</h1>
          <h4>Instructions</h4>
          <p>
            <ol>
              <li>
                This is the final round where you have to answer the killer
              </li>
              <li>You have to type the name of the killer in the input box.</li>
              <li>You will get only 2 attempts to guess the killer.</li>
              <li>
                In case you answer wrong on both attempts, you will not get the
                points for the final round.
              </li>
              <li>Input is not case sensitive.</li>
              <li>Best of Luck !</li>
            </ol>
          </p>
          <Button
            onClick={() => {
              setStatus(1);
              dispatch(startRound({level:4}));
            }}
          >
            Proceed to final round
          </Button>
        </div>
      ) : status === 1 ? (
        <div>
          <div>
            <h4>{ques.question}</h4>
            Enter your answer here:{" "}
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></input>
          </div>
          <div>
            <Button onClick={attemps > 0 ? handleSubmit : null}>
              Submit Answer
            </Button>
          </div>
          <div>Attempts Remaining: {attemps}</div>
        </div>
      ) : null}
      <p>{message}</p>
    </div>
  );
};

export default SolveMurder;
