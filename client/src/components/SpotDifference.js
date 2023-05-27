import React, { useState, useEffect } from "react"
import original from "../assets/images/original.jpg"
import modified from "../assets/images/modified.jpg"
import { useDispatch } from "react-redux";
import { endRound } from "../redux/slices/auth";

const SpotDifference = ({ levelUp }) => {
	const dispatch = useDispatch();
	const [message, setMessage] = useState(null)
	const [foundArr, setFoundArr] = useState([0,0,0,0,0])

	const updateFound = (i) => {
		if (foundArr[i] === 0) {
			const tmpArr = foundArr.map((item, ind) => {
				if (ind === i) {
					return 1
				} else {
					return item
				}
			})
			setFoundArr(tmpArr)
			setMessage("Found new difference")
		} else {
			setMessage("Already found, Try another")
		}
	}

	useEffect(() => {
		const sum = foundArr.reduce((a, b) => a + b, 0)
		if (sum === 5) {
			setMessage("Congratulations ! You've unlocked next clue.")
			levelUp();
			dispatch(endRound({level:1}));
		}
	}, [foundArr])
	

	return (
		<div>
			<h1>Round 2</h1>
			<div id="spot_wrap">
				<img
					name="original"
					src={original}
					width="470"
					height="369"
					border="0"
					usemap="#original"
					className="difference-img"
				/>
				<img
					name="modified"
					src={modified}
					width="470"
					height="369"
					border="0"
					usemap="#original"
					className="difference-img"
				/>
				<map name="original" id="original">
					<area
						shape="rect"
						coords="21,176,64,215"
						onClick={() => updateFound(0)}
						href="#image"
					/>
					<area
						shape="circle"
						coords="219,136,26"
						onClick={() => updateFound(1)}
						href="#image"
					/>
					<area
						shape="rect"
						coords="148,258,175,285"
						onClick={() => updateFound(2)}
						href="#image"
					/>
					<area
						shape="rect"
						coords="189,262,253,292"
						onClick={() => updateFound(3)}
						href="#image"
					/>
					<area
						shape="rect"
						coords="434,4,468,338"
						onClick={() => updateFound(4)}
						href="#image"
					/>
					<area shape="rect" coords="-1,-1,469,368" href="#image" />
				</map>
			</div>
			<div className="spotDifference-message-box">
				Total Differences Spotted: {foundArr.reduce((a, b) => a + b, 0)}
				<br />
				{message}
				<div className="spotDifference-message-instructions">
					<h4>Instructions</h4>
					<ul>
						<li>
							Spot differences and click on the image where you find the
							diffrences
						</li>
						<li>Spot 5 differences to proceed</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default SpotDifference
