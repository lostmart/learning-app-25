import { useState } from "react"

import { Link, useNavigate } from "react-router"
import PointsHolder from "../components/PointsHolder"
import ExerciseHeader from "../components/ExerciseHeader"
import RenderOptions from "../components/RenderOptions"

import dadImg from "../assets/01.png"

const MutiplePage = () => {
	const navigate = useNavigate()
	const options = ["A pizza", "A dog", "A ninja", "A cat"]
	const correctOpt = "A pizza"
	const [points, setPoints] = useState(0)

	const handleButtonClick = (option: string) => {
		console.log("running")

		if (option === correctOpt) {
			setPoints((prevPoints) => prevPoints + 1)
		}
		navigate("/fillIn")
	}

	return (
		<>
			<main
				className="flex flex-col items-center p-2 max-w-xl mx-auto"
				style={{ minHeight: "85vh" }}
			>
				<PointsHolder score={points} />
				<ExerciseHeader
					className="mb-4 text-center"
					titleText="What is this called ?"
					imageUrl={dadImg}
				/>
				<RenderOptions
					options={options}
					handleButtonClick={handleButtonClick}
				/>
			</main>
			<Link to="/fillIn" className="block text-center">
				Next
			</Link>
		</>
	)
}

export default MutiplePage
