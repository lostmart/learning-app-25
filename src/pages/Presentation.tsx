import { useState } from "react"
import helloAudio from "../assets/hello-one.mp3"
// import audioTwo from "../assets/hello-two.mp3"
// import teacerTwo from "../assets/04.png"
import kid from "../assets/jack.png"
import AudioPlayButton from "../components/AudioPlayButton"
import { motion } from "motion/react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"

import "swiper/swiper-bundle.css"

const Presentation = () => {
	// const [hasPlayed, setHasPlayed] = useState(false)

	// const [slide, setSlide] = useState(0)

	// const handlePlay = () => {
	// 	const audio = new Audio(helloAudio)
	// 	audio
	// 		.play()
	// 		.then(() => setHasPlayed(true))
	// 		.catch((err) => {
	// 			console.warn("Playback failed:", err)
	// 		})
	// }

	// const handlePlayTwo = () => {
	// 	const audio = new Audio(audioTwo)
	// 	audio
	// 		.play()
	// 		.then(() => setHasPlayed(true))
	// 		.catch((err) => {
	// 			console.warn("Playback failed:", err)
	// 		})
	// }

	return (
		<main style={{ minHeight: "80vh" }}>
			<Swiper
				navigation={true}
				modules={[Navigation, Pagination]}
				pagination={{
					clickable: true,
				}}
				className="mySwiper"
			>
				<SwiperSlide>
					<section className="flex justify-center flex-col items-center p-2 ">
						<motion.img
							initial={{ y: -100, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{
								duration: 0.5,
								scale: { type: "spring" },
							}}
							src={kid}
							alt="teacher"
							className="max-w-[460px]"
						/>
						<motion.div
							className="absolute bottom-10 w-full max-w-[460px]"
							style={{
								background: "#ffffffa6",
							}}
							initial={{ y: 100, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{
								duration: 0.6,
								delay: 0.2,
								scale: { type: "spring" },
							}}
						>
							<p className="text-center p-2 text-gray-950">
								Hello. My name is Jack, I’m nine. I’ve got a brother and a
								sister. This is my favorite computer game. It’s called ‘Roblox’!
							</p>
							<AudioPlayButton
								className="absolute bottom-18 left-2 z-50"
								audioUrl="https://magenta-fox-373734.hostingersite.com/wp-content/uploads/2025/08/01-jack.mp3"
							/>
						</motion.div>
					</section>
				</SwiperSlide>

				<SwiperSlide>Slide 2</SwiperSlide>
			</Swiper>
		</main>
	)
}

export default Presentation
