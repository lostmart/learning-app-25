import { useState } from "react"
import ButtonComp from "../components/ButtonComp"
import { Link } from "react-router"
import PointsHolder from "../components/PointsHolder"
import ExerciseHeader from "../components/ExerciseHeader"

type PhraseState = string[]

const WriteOptions = () => {
	const [phrase, setPhrase] = useState<PhraseState>([])

	const [points, setPoints] = useState(0)

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement
		setPhrase([target.innerHTML, ...phrase])
	}

	const RenderPhrase = () => {
		return (
			<div className="flex flex-row-reverse">
				{phrase.map((word) => {
					return (
						<span key={word} className="mr-1">
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
				style={{ minHeight: "85vh" }}
			>
				<PointsHolder score={points} />
				<ExerciseHeader
					className="mb-4 text-center"
					titleText="Write the options right now ..."
					imageUrl="https://images.pexels.com/photos/17918776/pexels-photo-17918776/free-photo-of-dandelion-in-hand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
				/>
				{phrase.length !== 0 ? <RenderPhrase /> : ""}{" "}
				{/* Changed logic to render phrases */}
				<div className="pt-4 flex gap-2 flex-wrap justify-center">
					<ButtonComp
						text="es"
						classNames="px-3 py-1 mb-3 border-2"
						theClick={(e) => handleClick(e)}
					/>
					<ButtonComp
						text="deliciosa"
						classNames="px-3 py-1 mb-3 border-2"
						theClick={(e) => handleClick(e)}
					/>
					<ButtonComp
						text="La casa"
						classNames="px-3 py-1 mb-3 border-2"
						theClick={(e) => handleClick(e)}
					/>
				</div>
			</main>
			<Link to="/" className="block text-center">
				Finish
			</Link>
		</>
	)
}

export default WriteOptions
