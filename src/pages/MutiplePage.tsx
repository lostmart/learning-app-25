import { useState } from "react"

import { Link } from "react-router"
import PointsHolder from "../components/PointsHolder"
import ExerciseHeader from "../components/ExerciseHeader"
import RenderOptions from "../components/RenderOptions"

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
			<PointsHolder score={points} />
			<main style={{ minHeight: "80vh" }}>
				<h2 className="text-center">This is my dad</h2>
				<div className="flex flex-col items-center p-2 max-w-3xl mx-auto relative md:flex-row md:gap-4">
					<ExerciseHeader
						className="mb-4 text-center md:w-[70%]"
						imageUrl={dadImg}
					/>
					<div className="w-full md:w-[25%]">
						<RenderOptions
							options={options}
							handleButtonClick={handleButtonClick}
						/>
					</div>
				</div>
			</main>
			<Link to="/fillIn" className="block text-center">
				Next
			</Link>
		</>
	)
}

export default MutiplePage
