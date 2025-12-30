import { useState } from "react"
import { Link } from "react-router"
import { motion } from "motion/react"
import { useLessonContext } from "../hooks/useLessonContext"
import ReadingPanel from "../components/ReadingPanel"
import type { TrueFalseSection } from "../services/types"

const TrueFalsePage = () => {
	const { lessonData, addScore, loading, error } = useLessonContext()

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [score, setScore] = useState(0)
	const [showFeedback, setShowFeedback] = useState(false)
	const [isCorrect, setIsCorrect] = useState(false)
	const [completed, setCompleted] = useState(false)

	// Loading states
	if (loading) {
		return (
			<div
				className="flex items-center justify-center"
				style={{ minHeight: "80vh" }}
			>
				<div className="text-xl">Loading...</div>
			</div>
		)
	}

	if (error || !lessonData) {
		return (
			<div
				className="flex items-center justify-center"
				style={{ minHeight: "80vh" }}
			>
				<div className="text-xl text-red-600">Error loading lesson</div>
			</div>
		)
	}

	// Get sections
	const readingSection = lessonData.sections.find((s) => s.type === "reading")
	const trueFalseSection = lessonData.sections.find(
		(s) => s.type === "true_false"
	) as TrueFalseSection | undefined

	if (!trueFalseSection) {
		return <div>No True/False questions available</div>
	}

	const currentQuestion = trueFalseSection.items[currentQuestionIndex]
	const correctAnswer = trueFalseSection.answers[currentQuestionIndex]
	const totalQuestions = trueFalseSection.items.length

	// Handle answer click
	const handleAnswer = (userAnswer: boolean) => {
		const correct = userAnswer === correctAnswer

		setIsCorrect(correct)
		setShowFeedback(true)

		if (correct) {
			setScore((prev) => prev + 1)
		}

		// Move to next question or complete
		setTimeout(() => {
			setShowFeedback(false)

			if (currentQuestionIndex < totalQuestions - 1) {
				setCurrentQuestionIndex((prev) => prev + 1)
			} else {
				// Exercise completed - add score to context
				const finalScore = correct ? score + 1 : score
				addScore(finalScore, totalQuestions)
				setCompleted(true)
			}
		}, 1500)
	}

	// Completed state
	if (completed) {
		return (
			<main
				className="flex flex-col items-center justify-center p-4"
				style={{ minHeight: "80vh" }}
			>
				<motion.div
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					className="text-center max-w-2xl"
				>
					<h2 className="text-4xl font-bold mb-4">Great Job! 🎉</h2>
					<p className="text-2xl mb-8">
						You got {score} out of {totalQuestions} correct!
					</p>

					<Link
						to="/multiple"
						className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors shadow-lg"
					>
						Continue to Multiple Choice →
					</Link>
				</motion.div>
			</main>
		)
	}

	// Active quiz state
	return (
		<main style={{ minHeight: "80vh" }} className="p-4">
			<h2 className="text-center text-2xl font-bold mb-2">
				{lessonData.title}
			</h2>
			<p className="text-center text-slate-400 mb-6">True or False Exercise</p>

			{/* Reading Panel - Collapsed by default */}
			{readingSection && readingSection.type === "reading" && (
				<ReadingPanel text={readingSection.text} />
			)}

			{/* Question Container */}
			<div className="max-w-3xl mx-auto">
				{/* Progress */}
				<div className="text-center mb-4">
					<span className="text-lg text-slate-400">
						Question {currentQuestionIndex + 1} of {totalQuestions}
					</span>
				</div>

				{/* Question Card */}
				<motion.div
					key={currentQuestionIndex}
					initial={{ x: 50, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.3 }}
					className="bg-slate-900 border border-slate-700 rounded-lg p-8 mb-6"
				>
					<p className="text-xl text-center mb-8">{currentQuestion}</p>

					{/* Answer Buttons */}
					<div className="flex gap-4 justify-center">
						<button
							onClick={() => handleAnswer(true)}
							disabled={showFeedback}
							className="px-8 py-4 bg-teal-700 hover:bg-teal-800 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-lg font-semibold rounded-lg transition-colors shadow-lg cursor-pointer"
						>
							✓ True
						</button>

						<button
							onClick={() => handleAnswer(false)}
							disabled={showFeedback}
							className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-lg font-semibold rounded-lg transition-colors shadow-lg cursor-pointer"
						>
							✗ False
						</button>
					</div>
				</motion.div>

				{/* Score Display */}
				<div className="text-center">
					<span className="text-lg">
						Current Score: {score}/
						{currentQuestionIndex + (showFeedback ? 1 : 0)}
					</span>
				</div>
			</div>

			{/* Feedback Modal */}
			{showFeedback && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
				>
					<motion.div
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						className={`p-8 rounded-lg ${
							isCorrect ? "bg-green-600" : "bg-red-600"
						} text-white text-2xl font-bold`}
					>
						{isCorrect ? "✓ Correct!" : "✗ Incorrect"}
					</motion.div>
				</motion.div>
			)}
		</main>
	)
}

export default TrueFalsePage
