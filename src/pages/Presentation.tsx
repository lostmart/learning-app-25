import { useState } from "react"
import helloAudio from "../assets/hello-one.mp3"
import audioTwo from "../assets/hello-two.mp3"
import teacerTwo from "../assets/04.png"
import kid from "../assets/jack.png"
import AudioPlayButton from "../components/AudioPlayButton"

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
			className="flex flex-col max-w-2xl items-center justify-center relative p-1 mx-auto"
			style={{ minHeight: "80vh" }}
		>
			<img src={kid} alt="teacher" className={slide === 0 ? "" : "hidden"} />
			<img
				src={teacerTwo}
				alt="teacher"
				className={slide === 0 ? "hidden" : ""}
			/>

			<p
				className={`text-center absolute bottom-25 text-gray-950 ${slide === 1 ? "hidden" : ""}`}
				style={{
					background: "#ffffffa6",
				}}
			>
				Hello. My name is Jack, I’m nine. I’ve got a brother and a sister. This
				is my favorite computer game. It’s called ‘Roblox’!
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

			<AudioPlayButton audioUrl="https://magenta-fox-373734.hostingersite.com/wp-content/uploads/2025/08/01-jack.mp3" />

			{!hasPlayed && (
				<button className="absolute bottom-0" onClick={handlePlay}>
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
