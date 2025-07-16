import { useState } from "react"
import RenderOptions from "../components/RenderOptions"
import PointsHolder from "../components/PointsHolder"
import { Link, useNavigate } from "react-router"
import ExerciseHeader from "../components/ExerciseHeader"
import imageTwo from "../assets/02.png"

const FillInBlank = () => {
	const navigate = useNavigate()
	const options = ["my friend", "my sister", "my uncle", "my brother"]
	const correctOpt = "my friend"

	const [points, setPoints] = useState(0)

	const handleButtonClick = (option: string) => {
		if (option === correctOpt) {
			setPoints((prevPoints) => prevPoints + 1)
		}
		navigate("/writeOpt")
	}

	return (
		<>
			<main
				className="flex flex-col items-center p-2  max-w-2xl mx-auto"
				style={{ minHeight: "80vh" }}
			>
				<PointsHolder score={points} />
				<ExerciseHeader
					className="mb-4 text-center"
					titleText="This is ______, Leo"
					imageUrl={imageTwo}
				/>
				<RenderOptions
					options={options}
					handleButtonClick={handleButtonClick}
				/>
			</main>
			<Link to="/writeOpt" className="block text-center">
				Next
			</Link>
		</>
	)
}

export default FillInBlank
