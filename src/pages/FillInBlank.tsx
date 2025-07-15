import { useState } from "react"
import RenderOptions from "../components/RenderOptions"
import PointsHolder from "../components/PointsHolder"
import { useNavigate } from "react-router"
import ExerciseHeader from "../components/ExerciseHeader"

const FillInBlank = () => {
	const navigate = useNavigate()
	const options = ["En la pizza", "En el parque", "La cancha", "La marmota"]
	const correctOpt = "En la pizza"

	const [points, setPoints] = useState(0)

	const handleButtonClick = (option: string) => {
		if (option === correctOpt) {
			setPoints((prevPoints) => prevPoints + 1)
		}
		navigate("/writeOpt")
	}

	return (
		<main className="flex min-h-screen flex-col items-center p-2 max-w-xl mx-auto">
			<PointsHolder score={points} />
			<ExerciseHeader
				className="mb-4"
				titleText="Donde esta la casa?"
				imageUrl="https://images.pexels.com/photos/17918776/pexels-photo-17918776/free-photo-of-dandelion-in-hand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
			/>
			<RenderOptions options={options} handleButtonClick={handleButtonClick} />
		</main>
	)
}

export default FillInBlank
