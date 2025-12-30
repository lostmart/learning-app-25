import { useEffect } from "react"
import { Link, useNavigate } from "react-router"
import confetti from "canvas-confetti"
import { motion } from "framer-motion"
import { useLessonContext } from "../hooks/useLessonContext"
import { calculatePercentage } from "../services/types"
import finalImg from "../assets/final.gif"
import { VscDebugRestart } from "react-icons/vsc"

const Final = () => {
	const { lessonData, score, resetScore } = useLessonContext()
	const navigate = useNavigate()

	useEffect(() => {
		fireConfetti()
	}, [])

	const fireConfetti = () => {
		confetti({
			particleCount: 150,
			spread: 80,
			origin: { y: 0.6 },
			colors: ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"],
		})
	}

	const percentage = calculatePercentage(score)

	// Determine message based on performance
	const getMessage = () => {
		if (percentage >= 90) return "Outstanding! 🌟"
		if (percentage >= 75) return "Great Job! 🎉"
		if (percentage >= 60) return "Good Work! 👍"
		return "Keep Practicing! 💪"
	}

	// Determine encouragement message
	const getEncouragement = () => {
		if (percentage >= 90) return "You've mastered this lesson!"
		if (percentage >= 75) return "You're doing excellent!"
		if (percentage >= 60) return "You're making good progress!"
		return "Practice makes perfect - try again!"
	}

	const handleRestart = () => {
		resetScore()
		navigate("/presentation")
	}

	return (
		<main
			className="flex flex-col items-center p-4 max-w-4xl mx-auto justify-center"
			style={{ minHeight: "80vh" }}
		>
			<motion.div
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="text-center"
			>
				{/* Title */}
				<h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-200">
					{getMessage()}
				</h1>
				<p className="text-xl text-slate-200 mb-6">
					{lessonData?.title || "Lesson Complete"}
				</p>

				{/* Celebration Image */}
				<motion.img
					src={finalImg}
					alt="Celebration"
					className="max-w-sm mx-auto mb-6"
					initial={{ rotate: -10 }}
					animate={{ rotate: 0 }}
					transition={{ type: "spring", stiffness: 100 }}
				/>

				{/* Score Display */}
				<motion.div
					className="bg-slate-900 border border-slate-700 rounded-lg p-8 mb-6"
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.3 }}
				>
					<div className="text-6xl font-bold text-blue-400 mb-2">
						{percentage}%
					</div>
					<div className="text-2xl text-slate-300 mb-4">
						{score.totalCorrect} out of {score.totalQuestions} correct
					</div>
					<p className="text-lg text-slate-400">{getEncouragement()}</p>
				</motion.div>

				{/* Score Breakdown (Optional - shows which exercises) */}
				<motion.div
					className="bg-slate-800 rounded-lg p-6 mb-6 max-w-md mx-auto"
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.5 }}
				>
					<h3 className="text-xl font-semibold mb-4 text-slate-200">
						📊 Lesson Summary
					</h3>
					<div className="space-y-2 text-left text-slate-300">
						<div className="flex justify-between">
							<span>✓ Reading Completed</span>
						</div>
						<div className="flex justify-between">
							<span>✓ True/False</span>
						</div>
						<div className="flex justify-between">
							<span>✓ Multiple Choice</span>
						</div>
						<div className="flex justify-between">
							<span>✓ Fill in the Blanks</span>
						</div>
					</div>
				</motion.div>

				{/* Action Buttons */}
				<motion.div
					className="flex flex-col sm:flex-row gap-4 justify-center"
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.7 }}
				>
					<button
						onClick={handleRestart}
						className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2"
					>
						<VscDebugRestart /> Restart Lesson
					</button>

					<Link
						to="/"
						className="px-8 py-4 bg-slate-600 hover:bg-slate-700 text-white text-lg font-semibold rounded-lg transition-colors shadow-lg inline-block"
					>
						← Back to Home
					</Link>
				</motion.div>
			</motion.div>
		</main>
	)
}

export default Final
