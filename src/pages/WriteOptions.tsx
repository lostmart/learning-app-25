import { useEffect, useState } from "react"
import ButtonComp from "../components/ButtonComp"
import { Link, useNavigate } from "react-router"
import PointsHolder from "../components/PointsHolder"
import ExerciseHeader from "../components/ExerciseHeader"
import imageThree from "../assets/03.png"

type PhraseState = string[]

const WriteOptions = () => {
	const navigate = useNavigate()

	const [phrase, setPhrase] = useState<PhraseState>([])
	const [points, setPoints] = useState(0)

	const correctPhrase = "Goodbye Chloe see you tomorrow"

	useEffect(() => {
		if (phrase.join(" ") === correctPhrase) {
			navigate("/final")
		}
	}, [phrase, navigate])

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement
		setPhrase((prev) => [...prev, target.innerHTML])
		setPoints((prev) => prev + 1)
	}

	const handleReset = () => {
		setPhrase([])
		setPoints(0)
	}

	const RenderPhrase = () => {
		return (
			<div className="flex">
				{phrase.map((word, i) => {
					return (
						<span key={i} className="mr-1">
							{word}
						</span>
					)
				})}
			</div>
		)
	}

	return (
		<>
			<main
				className="flex flex-col items-center p-2 max-w-xl mx-auto"
				style={{ minHeight: "80vh" }}
			>
				<PointsHolder score={points} />
				<ExerciseHeader
					className="mb-4 text-center"
					titleText="Write a sentence with these words"
					imageUrl={imageThree}
				/>
				{phrase.length !== 0 ? <RenderPhrase /> : ""}{" "}
				{/* Changed logic to render phrases */}
				<div className="pt-4 flex gap-2 flex-wrap justify-center">
					<ButtonComp
						text="tomorrow"
						classNames="px-3 py-1 mb-3 border-2"
						theClick={(e) => handleClick(e)}
					/>
					<ButtonComp
						text="Chloe"
						classNames="px-3 py-1 mb-3 border-2"
						theClick={(e) => handleClick(e)}
					/>
					<ButtonComp
						text="see"
						classNames="px-3 py-1 mb-3 border-2"
						theClick={(e) => handleClick(e)}
					/>
					<ButtonComp
						text="Goodbye"
						classNames="px-3 py-1 mb-3 border-2"
						theClick={(e) => handleClick(e)}
					/>
					<ButtonComp
						text="you"
						classNames="px-3 py-1 mb-3 border-2"
						theClick={(e) => handleClick(e)}
					/>
				</div>
				<ButtonComp
					text="Clear"
					classNames="mt-4 bg-rose-600 text-white px-3 py-1"
					theClick={() => handleReset()}
				/>
			</main>
			<Link to="/" className="block text-center">
				Finish
			</Link>
		</>
	)
}

export default WriteOptions
