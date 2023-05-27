import React, { useState, useEffect } from "react"
import Button from "react-bootstrap/esm/Button"

const ques = [
	{
		question: "1 = 5, 2 = 25, 3 = 325, 4 = 4325 ...Then 5 = ?",
		options: ["5", "1", "9825", "12625"],
		answer: 1
	},
	{
		question: "When was the statue of liberty unveiled?",
		options: ["October 12, 1922", "July 28, 1876", "October 28, 1886", "December 24, 1906"],
		answer: 2
	}
]

const answers = ques.map((item, index) => item.answer)

let intervalId = null
const Quiz = ({ levelUp }) => {
	const [status, setStatus] = useState(0)
	const [message, setMessage] = useState(null)
	const [timer, setTimer] = useState(10)
	const [selectedAnswers, setSelectedAnswers] = useState(
		Array(ques.length).fill(-1)
	)

	useEffect(() => {
		if (status === 1) {
			intervalId = setInterval(() => {
				setTimer((timer) => timer - 1)
			}, 1000)
		}
	}, [status])

	if (timer <= 0) {
		clearInterval(intervalId)
	}

	const handleSubmit = () => {
		if (selectedAnswers.length < ques.length) {
			return
		} else {
			if (JSON.stringify(selectedAnswers) === JSON.stringify(answers)) {
				console.log("quiz win")
				setMessage("Congratulations! You won")
				levelUp()
			} else {
				setMessage(
					"Oops! wrong answer, You lost the murder mystry. Killer won."
				)
			}
		}
	}

	const updateAnswers = (aind, qind) => {
		const tmpArr = selectedAnswers.map((item, ind) => {
			if (ind === qind) {
				return aind
			} else {
				return item
			}
		})
		setSelectedAnswers(tmpArr)
	}

	// console.log(selectedAnswers)
	// console.log("answers", answers)

	return (
		<div>
			{ques.map((q, qind) => (
				<div>
					<h5>{q.question}</h5>
					{q.options.map((option, index) => (
						<div
							onClick={() => updateAnswers(index, qind)}
							key={index}
							className={
								index === selectedAnswers[qind]
									? "observation-option option-selected"
									: "observation-option"
							}
						>
							{option}
						</div>
					))}
				</div>
			))}
			<Button onClick={handleSubmit}>Submit</Button>
		</div>
	)
}

export default Quiz
