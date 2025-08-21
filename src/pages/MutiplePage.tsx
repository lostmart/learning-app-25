import { useState } from "react"

import { Link } from "react-router"
import PointsHolder from "../components/PointsHolder"
import ExerciseHeader from "../components/ExerciseHeader"
import RenderOptions from "../components/RenderOptions"

import AudioPlayButton from "../components/AudioPlayButton"

import dadImg from "../assets/01.png"

const MutiplePage = () => {
	// const navigate = useNavigate()
	const options = [
		"Nice to meet you",
		"This is my dad",
		"This is my father",
		"This is my mom",
	]
	const correctOpt = "This is my dad"
	const [points, setPoints] = useState(0)

	const handleButtonClick = (option: string) => {
		//console.log("running")

		if (option === correctOpt) {
			setPoints((prevPoints) => prevPoints + 1)
		}
		// navigate("/fillIn")
	}

	return (
		<>
			<main
				className="flex flex-col items-center p-2 max-w-2xl mx-auto relative"
				style={{ minHeight: "80vh" }}
			>
				<PointsHolder score={points} />
				<ExerciseHeader
					className="mb-4 text-center"
					titleText="Chloe, ... ?"
					imageUrl={dadImg}
				/>
				<AudioPlayButton audioUrl="https://magenta-fox-373734.hostingersite.com/wp-content/uploads/2025/08/01-jack.mp3" />
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
