import { useState } from "react"
import ButtonComp from "../components/ButtonComp"
import { Link } from "react-router"

type PhraseState = string[]

const WriteOptions = () => {
	const [phrase, setPhrase] = useState<PhraseState>([])

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
				<h2 className="text-xl my-2">Write the options right now ...</h2>
				<img
					className="rounded-sm mb-2"
					src="https://images.pexels.com/photos/17918776/pexels-photo-17918776/free-photo-of-dandelion-in-hand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
					alt="no temas a la noche oscura"
				/>
				{phrase.length !== 0 ? <RenderPhrase /> : "No hay palabras todavía"}{" "}
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
