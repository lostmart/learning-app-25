import kid from "../assets/jack.png"
import { motion } from "motion/react"

import "swiper/swiper-bundle.css"
import { useEffect, useState } from "react"
import type { LessonData } from "../services/types"
import { getLesson } from "../services/lessonService"

const Presentation = () => {
	const [lesson, setLesson] = useState<LessonData | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function loadLesson() {
			try {
				const data = await getLesson("lesson-1")
				setLesson(data)
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load lesson")
			} finally {
				setLoading(false)
			}
		}

		loadLesson()
	}, [])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error}</div>
	if (!lesson) return <div>No lesson found</div>

	return (
		<main style={{ minHeight: "80vh" }}>
			<h2 className="text-center m-4 text-lg">{lesson.title}</h2>
			<section className="flex justify-center relative items-center p-2 ">
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
					className="absolute bottom-10 w-full max-w-[460px] md:static md:w-[30%] md:max-w-none md:ml-4"
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{
						duration: 0.6,
						delay: 0.2,
						scale: { type: "spring" },
					}}
				>
					<p className="text-center p-2 text-gray-100">
						{lesson.sections[0].type === "reading" && lesson.sections[0].text}
					</p>
					<div className="w-full">
						<div className="flex w-full items-center justify-center">
							<hr className="border-t-2 border-gray-300 my-4 w-1/2" />
							<span className="mx-2">Reading</span>
							<hr className="border-t-2 border-gray-300 my-4 w-1/2" />
						</div>
					</div>
					<article>
						{lesson.sections[1].type === "true_false" && (
							<>
								<h3 className="text-center">True of false</h3>
								<ul className="list-disc list-inside">
									{lesson.sections[1].items.map((item, index) => (
										<li key={index} className="text-gray-100">
											{item}{" "}
											<select name="" id="">
												<option value="">-</option>
												<option className="text-black" value="true">
													True
												</option>
												<option className="text-black" value="false">
													False
												</option>
											</select>
										</li>
									))}
								</ul>
							</>
						)}
					</article>
				</motion.div>
			</section>
		</main>
	)
}

export default Presentation
