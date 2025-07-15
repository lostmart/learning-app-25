import { useState } from "react"

import { useNavigate } from "react-router"
import PointsHolder from "../components/PointsHolder"
import ExerciseHeader from "../components/ExerciseHeader"
import RenderOptions from "../components/RenderOptions"

const MutiplePage = () => {
	const navigate = useNavigate()
	const options = ["En la pizza", "En el parque", "La cancha", "La marmota"]
	const correctOpt = "En la pizza"
	const [points, setPoints] = useState(0)

	const handleButtonClick = (option: string) => {
		console.log("running")

		if (option === correctOpt) {
			setPoints((prevPoints) => prevPoints + 1)
		}
		navigate("/fillIn")
	}

	return (
		<main className="flex min-h-screen flex-col items-center p-2 max-w-xl mx-auto">
			<PointsHolder score={points} />
			<ExerciseHeader
				className="mb-4"
				titleText="What is this called ?"
				imageUrl="https://images.pexels.com/photos/27025471/pexels-photo-27025471/free-photo-of-nourriture-aliments-pizza-restaurant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
			/>
			<RenderOptions options={options} handleButtonClick={handleButtonClick} />
		</main>
	)
}

export default MutiplePage
