import { useState } from "react"
import { Link } from "react-router"
import { motion } from "framer-motion"
import { useLessonContext } from "../hooks/useLessonContext"
import ReadingPanel from "../components/ReadingPanel"
import PointsHolder from "../components/PointsHolder"
import ExerciseHeader from "../components/ExerciseHeader"
import RenderOptions from "../components/RenderOptions"
import FeedBack from "../components/FeedBack"
import { TbPlayerTrackNext } from "react-icons/tb"
import { VscDebugRestart } from "react-icons/vsc"
import type { MultipleChoiceSection } from "../services/types"
import kid from "../assets/jack.png"

const MultiplePage = () => {
	const { lessonData, addScore, loading, error } = useLessonContext()

	const [questionIndex, setQuestionIndex] = useState(0)
	const [points, setPoints] = useState(0)
	const [showFeedback, setShowFeedback] = useState(false)
	const [feedbackMessage, setFeedbackMessage] = useState("")
	const [correctAnswer, setCorrectAnswer] = useState(false)
	const [completed, setCompleted] = useState(false)

	// Loading states
	if (loading) {
		return <div className="text-center mt-8">Loading...</div>
	}

	if (error || !lessonData) {
		return (
			<div className="text-center mt-8 text-red-600">
				<p>Error loading lesson</p>
			</div>
		)
	}

	// Get sections from context
	const readingSection = lessonData.sections.find((s) => s.type === "reading")
	const multipleChoiceSection = lessonData.sections.find(
		(s) => s.type === "multiple_choice"
	) as MultipleChoiceSection | undefined

	if (!multipleChoiceSection) {
		return (
			<div className="text-center mt-8">
				No multiple choice questions available
			</div>
		)
	}

	const currentQuestion = multipleChoiceSection.questions[questionIndex]
	const totalQuestions = multipleChoiceSection.questions.length

	// Handle answer click
	const handleButtonClick = (optionLetter: string) => {
		setShowFeedback(true)

		if (optionLetter === currentQuestion.correctAnswer) {
			setPoints((prevPoints) => prevPoints + 1)
			setCorrectAnswer(true)
			setFeedbackMessage("Correct!")
		} else {
			setCorrectAnswer(false)
			setFeedbackMessage("Incorrect!")
		}

		setTimeout(() => {
			setShowFeedback(false)

			if (questionIndex < totalQuestions - 1) {
				setQuestionIndex((prev) => prev + 1)
			} else {
				// Quiz complete - add final score to context
				const finalScore =
					optionLetter === currentQuestion.correctAnswer ? points + 1 : points
				addScore(finalScore, totalQuestions)
				setCompleted(true)
			}
		}, 1300)
	}

	// Handle skip
	const handleSkipClick = () => {
		if (questionIndex < totalQuestions - 1) {
			setQuestionIndex((prev) => prev + 1)
		} else {
			// Finished without answering last question
			addScore(points, totalQuestions)
			setCompleted(true)
		}
	}

	// Handle restart
	const handleRestartClick = () => {
		setQuestionIndex(0)
		setPoints(0)
		setShowFeedback(false)
		setFeedbackMessage("")
		setCompleted(false)
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
					<h2 className="text-4xl font-bold mb-4">Well Done! 🎉</h2>
					<p className="text-2xl mb-8">
						You got {points} out of {totalQuestions} correct!
					</p>

					<div className="flex gap-4 justify-center">
						<Link
							to="/fillIn"
							className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors shadow-lg"
						>
							Continue to Fill in the Blanks →
						</Link>

						<button
							onClick={handleRestartClick}
							className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
						>
							<VscDebugRestart /> Retry
						</button>
					</div>
				</motion.div>
			</main>
		)
	}

	// Active quiz
	return (
		<>
			<main style={{ minHeight: "80vh" }}>
				<h2 className="text-center text-2xl mt-4 font-bold">
					{lessonData.title}
				</h2>
				<p className="text-center text-slate-400 mb-4">
					Multiple Choice Exercise
				</p>

				{/* Reading Panel - collapsed by default */}
				{readingSection && readingSection.type === "reading" && (
					<ReadingPanel text={readingSection.text} />
				)}

				{/* Progress */}
				<div className="text-center mb-4">
					<span className="text-lg text-slate-400">
						Question {questionIndex + 1} of {totalQuestions}
					</span>
				</div>

				<div className="flex flex-col items-center p-2 max-w-5xl mx-auto relative md:flex-row md:gap-4">
					<ExerciseHeader
						titleText={currentQuestion.text}
						className="mb-4 text-center md:w-[67%]"
						imageUrl={kid}
					/>
					<div className="w-full md:w-[33%] min-h-[256px] flex flex-col justify-between gap-4">
						<RenderOptions
							options={currentQuestion.options}
							handleButtonClick={handleButtonClick}
						/>
						<motion.button
							className="w-full p-2 mt-8 text-white cursor-pointer max-w-[560px] bg-gray-600 hover:bg-gray-700 font-medium flex items-center justify-center gap-2"
							type="button"
							onClick={handleSkipClick}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5, duration: 0.35 }}
						>
							Skip <TbPlayerTrackNext />
						</motion.button>
					</div>
				</div>
			</main>

			{showFeedback && (
				<FeedBack
					feedbackMessage={feedbackMessage}
					showFeedback={showFeedback}
					correctAnswer={correctAnswer}
				/>
			)}

			<PointsHolder score={points} />
		</>
	)
}

export default MultiplePage
