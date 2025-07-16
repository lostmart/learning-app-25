import confetti from "canvas-confetti"
import { useEffect } from "react"
import finalImg from "../assets/final.gif"

const Final = () => {
	useEffect(() => {
		fireConfetti()
	}, [])

	const fireConfetti = () => {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		})
	}

	return (
		<main
			className="flex flex-col items-center p-2 max-w-xl mx-auto justify-center bg-white"
			style={{ minHeight: "80vh" }}
		>
			<h2 className="text-2xl mb-4 text-center text-gray-900">Congrats !!</h2>
			<img src={finalImg} alt="final stuff" />
		</main>
	)
}

export default Final
