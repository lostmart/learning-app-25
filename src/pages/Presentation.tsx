import { Link } from "react-router"
import { motion } from "motion/react"
import { useLessonContext } from "../hooks/useLessonContext"
import kid from "../assets/jack.png"

const ReadingPage = () => {
	const { lessonData, loading, error } = useLessonContext()

	// Loading and error states
	if (loading) {
		return (
			<div
				className="flex items-center justify-center"
				style={{ minHeight: "80vh" }}
			>
				<div className="text-xl">Loading lesson...</div>
			</div>
		)
	}

	if (error) {
		return (
			<div
				className="flex items-center justify-center"
				style={{ minHeight: "80vh" }}
			>
				<div className="text-xl text-red-600">Error: {error}</div>
			</div>
		)
	}

	if (!lessonData) {
		return (
			<div
				className="flex items-center justify-center"
				style={{ minHeight: "80vh" }}
			>
				<div className="text-xl">No lesson found</div>
			</div>
		)
	}

	// Get reading section
	const readingSection = lessonData.sections.find((s) => s.type === "reading")

	if (!readingSection || readingSection.type !== "reading") {
		return <div>No reading content available</div>
	}

	return (
		<main style={{ minHeight: "80vh" }}>
			<h2 className="text-center m-4 text-2xl font-bold">{lessonData.title}</h2>
			<p className="text-center text-slate-400 mb-6">{lessonData.difficulty}</p>

			<section className="flex flex-col md:flex-row justify-center items-center p-4 gap-8 max-w-6xl mx-auto">
				{/* Character Animation */}
				<motion.img
					initial={{ y: -100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{
						duration: 0.5,
						scale: { type: "spring" },
					}}
					src={kid}
					alt="Character"
					className="max-w-[340px] w-full"
				/>

				{/* Reading Content */}
				<motion.div
					className="w-full md:w-[50%] max-w-2xl"
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{
						duration: 0.6,
						delay: 0.2,
						scale: { type: "spring" },
					}}
				>
					{/* Reading Label */}
					<div className="flex items-center justify-center mb-6">
						<hr className="border-t-2 border-gray-300 w-1/4" />
						<span className="mx-4 text-lg font-medium">📖 Reading</span>
						<hr className="border-t-2 border-gray-300 w-1/4" />
					</div>

					{/* Reading Text */}
					<div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8">
						<p className="text-slate-100 leading-relaxed text-lg">
							{readingSection.text}
						</p>
					</div>

					{/* Continue Button */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1, duration: 0.5 }}
						className="text-center"
					>
						<Link
							to="/true-false"
							className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors shadow-lg"
						>
							Continue to Exercises →
						</Link>
					</motion.div>
				</motion.div>
			</section>
		</main>
	)
}

export default ReadingPage
