import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import q1 from "../assets/images/q1.jpg";
import { endRound, startRound } from "../redux/slices/auth";
import { useDispatch } from "react-redux";

const ques = [
  {
    question:
      "A man tells a woman that his mother-in-law is mother of her mother-in-law. So that man is _____________ of woman(define relation).",
    answer: "fatherinlaw",
  },
];

let intervalId = null;
const Observation = ({ levelUp, setGameon, gameOn }) => {
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState(null);
  const [timer, setTimer] = useState(10);
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();
  const selectedQues = ques[Math.floor(Math.random() * ques.length)];

  const handleSubmit = () => {
    if (answer === "") {
      return;
    } else {
      if (answer === selectedQues.answer) {
        // setMessage("Congratulations! You won");
        setStatus(2);
        dispatch(endRound({level:2}));

      } else {
        setMessage("Incorrect Answer");
      }
    }
  };

  console.log(timer);
  return (
    <div>
      {status === 0 ? (
        <div>
          <h1>Round 3</h1>
          <h4>Instructions</h4>
          <p>
            <ol>
              <li>Solve the given riddle and type the answer in the box</li>
              <li>
                Enter your answer in lower cases without any space or special
                character (if there is any).
              </li>
              <li>
                After solving the riddle, you will be given a link to a pdf
                which contains the next part of the story.
              </li>
              <li>
                Answer the question correctly to proceed ahead in Murder Mystry
              </li>
              <li>Press "start Game" Button when you're ready.</li>
              <li>Best of Luck !</li>
            </ol>
          </p>
          <Button
            onClick={() => {
              setStatus(1);
              dispatch(startRound({level:2}));

            }}
          >
            Start the game
          </Button>
        </div>
      ) : status === 1 ? (
        <div>
          <div>
            <h4>{selectedQues.question}</h4>
            Enter your answer here:{" "}
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></input>
          </div>
          <div>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      ) : status === 2 ? (
        <div>
          <div>
            <h1>Congratulations on completing Round 3!!</h1>
            Click{" "}
            <a
              target="_blank"
              href="https://drive.google.com/file/d/16LzMVrkcvyJdcLg2aGbwTgZPsI4IeTRD/view?usp=sharing"
            >
              Here
            </a>{" "}
            to access the PDF for the next part of the hunt
          </div>
          <div>
            <Button
              onClick={() => {
                levelUp();
                setGameon(true);
                dispatch(startRound({level:3}));
              }}
            >
              Proceed to next Round
            </Button>
          </div>
        </div>
      ) : null}
      <p>{message}</p>
    </div>
  );
};

export default Observation;
