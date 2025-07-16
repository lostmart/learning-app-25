import { useState } from "react"
import classRoom from "../assets/class-two.jpg"
import helloAudio from "../assets/hello-one.mp3"

const Presentation = () => {
	const [hasPlayed, setHasPlayed] = useState(false)

	const handlePlay = () => {
		const audio = new Audio(helloAudio) // make sure the file is in public/audio/
		audio
			.play()
			.then(() => setHasPlayed(true))
			.catch((err) => {
				console.warn("Playback failed:", err)
			})
	}
	return (
		<main
			className="flex flex-col items-center justify-center  relative p-1"
			style={{ minHeight: "80vh" }}
		>
			<img src={classRoom} alt="teacher" />
			<p
				className="text-center  text-gray-950"
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

			{!hasPlayed && (
				<button className="absolute bottom-10" onClick={handlePlay}>
					Start Presentation
				</button>
			)}
		</main>
	)
}

export default Presentation
