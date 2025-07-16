import { useState } from "react"
import classRoom from "../assets/class-two.jpg"
import helloAudio from "../assets/hello-one.mp3"
import audioTwo from "../assets/hello-two.mp3"
import teacerTwo from "../assets/04.png"

const Presentation = () => {
	const [hasPlayed, setHasPlayed] = useState(false)

	const [slide, setSlide] = useState(0)

	const handlePlay = () => {
		const audio = new Audio(helloAudio)
		audio
			.play()
			.then(() => setHasPlayed(true))
			.catch((err) => {
				console.warn("Playback failed:", err)
			})
	}

	const handlePlayTwo = () => {
		const audio = new Audio(audioTwo)
		audio
			.play()
			.then(() => setHasPlayed(true))
			.catch((err) => {
				console.warn("Playback failed:", err)
			})
	}

	const nextSlide = () => {
		setSlide(slide + 1)
		handlePlayTwo()
	}
	return (
		<main
			className="flex flex-col items-center justify-center  relative p-1"
			style={{ minHeight: "80vh" }}
		>
			<img
				src={classRoom}
				alt="teacher"
				className={slide === 0 ? "" : "hidden"}
			/>
			<img
				src={teacerTwo}
				alt="teacher"
				className={slide === 0 ? "hidden" : ""}
			/>

			<p
				className={`text-center text-gray-950 ${slide === 1 ? "hidden" : ""}`}
				style={{
					position: "absolute",
					background: "#ffffffa6",
					top: "60%",
				}}
			>
				Hello Gale, my name is Linda. I’d like to introduce you to a simple app
				I’ve been working on. It’s designed to support learning in a hands-on,
				approachable way. It’s not overly complicated, just something to help
				make understanding new topics a bit easier and more interactive.
			</p>

			<p
				className={`text-center text-gray-950 ${slide === 0 ? "hidden" : ""}`}
				style={{
					position: "absolute",
					background: "#ffffffa6",
					top: "60%",
				}}
			>
				and you can even change characters and voices with different accents, am
				I right
			</p>

			{!hasPlayed && (
				<button className="absolute bottom-10" onClick={handlePlay}>
					Start Presentation
				</button>
			)}
			<button
				onClick={nextSlide}
				className="absolute bottom-0 bg-blue-300 px-2"
			>
				Next
			</button>
		</main>
	)
}

export default Presentation
