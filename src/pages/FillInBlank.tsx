import { useState } from "react"
import { Link } from "react-router"
import { motion } from "framer-motion"
import { useLessonContext } from "../hooks/useLessonContext"
import ReadingPanel from "../components/ReadingPanel"
import PointsHolder from "../components/PointsHolder"
import FeedBack from "../components/FeedBack"
import type { FillInBlanksSection } from "../services/types"

const FillInBlank = () => {
	const { lessonData, addScore, loading, error } = useLessonContext()

	const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
	const [points, setPoints] = useState(0)
	const [showFeedback, setShowFeedback] = useState(false)
	// const [feedbackMessage, setFeedbackMessage] = useState("")
	const [isCorrect, setIsCorrect] = useState(false)
	const [completed, setCompleted] = useState(false)
	const [usedWords, setUsedWords] = useState<string[]>([])

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
	const fillInSection = lessonData.sections.find(
		(s) => s.type === "fill_in_the_blanks"
	) as FillInBlanksSection | undefined

	if (!fillInSection) {
		return (
			<div className="text-center mt-8">
				No fill-in-the-blanks questions available
			</div>
		)
	}

	const currentSentence = fillInSection.sentences[currentSentenceIndex]
	const correctAnswer = fillInSection.answers[currentSentenceIndex]
	const totalSentences = fillInSection.sentences.length

	// Handle word selection
	const handleWordClick = (selectedWord: string) => {
		const correct = selectedWord === correctAnswer

		setIsCorrect(correct)
		setShowFeedback(true)
		// setFeedbackMessage(correct ? "Correct!" : "Try again!")

		if (correct) {
			setPoints((prev) => prev + 1)
			// Mark word as used ONLY if correct
			setUsedWords((prev) => [...prev, selectedWord])

			// Move to next sentence after delay
			setTimeout(() => {
				setShowFeedback(false)

				if (currentSentenceIndex < totalSentences - 1) {
					setCurrentSentenceIndex((prev) => prev + 1)
				} else {
					// Exercise completed
					addScore(points + 1, totalSentences)
					setCompleted(true)
				}
			}, 1500)
		} else {
			// Wrong answer - allow retry
			setTimeout(() => {
				setShowFeedback(false)
			}, 1500)
		}
	}

	// Completion screen
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
					<h2 className="text-4xl font-bold mb-4">Excellent Work! 🎉</h2>
					<p className="text-2xl mb-8">
						You got {points} out of {totalSentences} correct!
					</p>

					<Link
						to="/final"
						className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors shadow-lg"
					>
						See Final Results →
					</Link>
				</motion.div>
			</main>
		)
	}

	// Active exercise
	return (
		<>
			<main style={{ minHeight: "80vh" }} className="p-4">
				<h2 className="text-center text-2xl font-bold mb-2">
					{lessonData.title}
				</h2>
				<p className="text-center text-slate-400 mb-6">
					Fill in the Blanks Exercise
				</p>

				{/* Reading Panel - collapsed by default */}
				{readingSection && readingSection.type === "reading" && (
					<ReadingPanel text={readingSection.text} />
				)}

				<div className="max-w-3xl mx-auto">
					{/* Progress */}
					<div className="text-center mb-4">
						<span className="text-lg text-slate-400">
							Sentence {currentSentenceIndex + 1} of {totalSentences}
						</span>
					</div>

					{/* Sentence with Blank */}
					<motion.div
						key={currentSentenceIndex}
						initial={{ x: 50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.3 }}
						className="bg-slate-900 border border-slate-700 rounded-lg p-8 mb-6"
					>
						<p className="text-2xl text-center mb-8 leading-relaxed">
							{currentSentence.split("_______").map((part, index, array) => (
								<span key={index}>
									{part}
									{index < array.length - 1 && (
										<span className="inline-block min-w-[120px] mx-2 px-4 py-1 border-b-4 border-blue-500 text-blue-400 translate-y-1/2 "></span>
									)}
								</span>
							))}
						</p>
					</motion.div>

					{/* Word Bank */}
					<div className="mb-8">
						<h3 className="text-center text-lg mb-4 text-slate-300">
							Choose the correct word:
						</h3>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
							{fillInSection.word_bank.map((word, index) => {
								const isUsed = usedWords.includes(word)
								const isDisabled = showFeedback || isUsed

								return (
									<motion.button
										key={index}
										onClick={() => handleWordClick(word)}
										disabled={isDisabled}
										className={`
											px-6 py-4 text-lg font-medium rounded-lg 
											transition-all transform hover:scale-105
											${
												isUsed
													? "bg-gray-700 text-gray-500 cursor-not-allowed line-through"
													: "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
											}
											${isDisabled && !isUsed ? "opacity-50 cursor-not-allowed" : ""}
										`}
										whileHover={!isDisabled ? { scale: 1.05 } : {}}
										whileTap={!isDisabled ? { scale: 0.95 } : {}}
									>
										{word}
									</motion.button>
								)
							})}
						</div>
					</div>

					{/* Score Display */}
					<PointsHolder score={points} />
				</div>
			</main>

			{/* Feedback */}
			{showFeedback && (
				<FeedBack
					feedbackMessage={isCorrect ? "Correct!" : "Incorrect!"}
					showFeedback={showFeedback}
					correctAnswer={isCorrect}
				/>
			)}
		</>
	)
}

export default FillInBlank
