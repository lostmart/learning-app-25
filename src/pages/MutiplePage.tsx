// Updated MutiplePage.tsx
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import PointsHolder from "../components/PointsHolder"
import ExerciseHeader from "../components/ExerciseHeader"
import RenderOptions from "../components/RenderOptions"
import FeedBack from "../components/FeedBack"
import { TbPlayerTrackNext } from "react-icons/tb"
import { VscDebugRestart } from "react-icons/vsc"

interface QuizOption {
	letter: string
	text: string
}

interface QuizQuestion {
	id: number
	text: string
	options: QuizOption[]
	correctAnswer: string
	imageUrl?: string
	note?: string
}

interface QuizData {
	title: string
	subtitle: string
	description: string
	questions: QuizQuestion[]
}

const MutiplePage = () => {
	const [exerciseData, setExerciseData] = useState<QuizData | null>(null)
	const [questionIndex, setQuestionIndex] = useState(0)
	const [points, setPoints] = useState(0)
	const [showFeedback, setShowFeedback] = useState(false)
	const [feedbackMessage, setFeedbackMessage] = useState("")
	const [correctAnswer, setCorrectAnswer] = useState(false)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [quizStarted, setQuizStarted] = useState(false)

	useEffect(() => {
		const fetchQuizData = async () => {
			try {
				setLoading(true)
				const response = await fetch("lessons/london-quizz.json")

				if (!response.ok) {
					throw new Error(`Failed to fetch quiz data: ${response.statusText}`)
				}

				const data = await response.json()
				setExerciseData(data)
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "An error occurred loading the quiz"
				)
				console.error("Error fetching quiz data:", err)
			} finally {
				setLoading(false)
			}
		}

		fetchQuizData()
	}, [])

	const handleStartQuiz = () => {
		setQuizStarted(true)
	}

	const handleButtonClick = (optionLetter: string) => {
		if (!exerciseData) return

		const currentQuestion = exerciseData.questions[questionIndex]

		setShowFeedback(true)

		if (optionLetter === currentQuestion.correctAnswer) {
			setPoints((prevPoints) => prevPoints + 1)
			setCorrectAnswer(true)
			setFeedbackMessage("Correct!")
		} else {
			setFeedbackMessage("Incorrect!")
			setCorrectAnswer(false)
		}

		setTimeout(() => {
			setShowFeedback(false)

			if (optionLetter === currentQuestion.correctAnswer) {
				setPoints((prevPoints) => prevPoints + 1)
				setCorrectAnswer(true)
				setFeedbackMessage("Correct!")
				if (questionIndex < exerciseData.questions.length - 1) {
					setQuestionIndex((prev) => prev + 1)
				} else {
					// Quiz finished
					setFeedbackMessage("Quiz finished!")
				}
			}
		}, 1300)
	}

	const handleSkipClick = () => {
		if (!exerciseData) return

		if (questionIndex < exerciseData.questions.length - 1) {
			setQuestionIndex((prev) => prev + 1)
		} else {
			// Quiz finished
			setFeedbackMessage("Quiz finished!")
			setShowFeedback(true)
		}
	}

	const handleRestartClick = () => {
		setQuestionIndex(0)
		setPoints(0)
		setShowFeedback(false)
		setFeedbackMessage("")
		setQuizStarted(false) // Return to welcome screen
	}

	if (loading) {
		return <div className="text-center mt-8">Loading...</div>
	}

	if (error) {
		return (
			<div className="text-center mt-8 text-red-600">
				<p>Error: {error}</p>
				<button
					onClick={() => window.location.reload()}
					className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
				>
					Retry
				</button>
			</div>
		)
	}

	if (!exerciseData) {
		return <div className="text-center mt-8">No quiz data available</div>
	}

	// Welcome Screen - shown before quiz starts
	if (!quizStarted) {
		return (
			<main
				style={{ minHeight: "80vh" }}
				className="flex items-center justify-center"
			>
				<motion.div
					className="max-w-2xl mx-auto p-8 text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className="text-4xl font-bold mb-4">{exerciseData.title}</h1>
					{exerciseData.subtitle && (
						<h2 className="text-xl text-slate-600 mb-4">
							{exerciseData.subtitle}
						</h2>
					)}
					<p className="text-lg text-slate-700 mb-6">
						{exerciseData.description}
					</p>

					<div className="bg-slate-900  border border-slate-500 rounded-lg p-6 mb-8">
						<p className="text-slate-100 mb-2">
							📝 <strong>{exerciseData.questions.length}</strong> questions
						</p>
						<p className="text-slate-200">
							🎯 Test your knowledge and see how many you can get right!
						</p>
					</div>

					<motion.button
						onClick={handleStartQuiz}
						className="px-8 py-4 bg-slate-900 text-white text-xl rounded-lg hover:bg-blue-800 transition font-semibold shadow-lg cursor-pointer"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						Start Quiz
					</motion.button>
				</motion.div>
			</main>
		)
	}

	// Active Quiz Screen
	const currentQuestion = exerciseData.questions[questionIndex]

	return (
		<>
			<main style={{ minHeight: "80vh" }}>
				<h2 className="text-center text-2xl mt-4">{exerciseData.title}</h2>
				<p className="text-center text-slate-600">{exerciseData.description}</p>
				<div className="flex flex-col items-center p-2 max-w-5xl mx-auto relative md:flex-row md:gap-4">
					<ExerciseHeader
						titleText={currentQuestion.text}
						className="mb-4 text-center md:w-[67%]"
						imageUrl={currentQuestion?.imageUrl}
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
							transition={{ delay: 4.7, duration: 0.35 }}
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

			<button
				className="block text-center cursor-pointer mx-auto m-4 px-6 py-2 bg-red-900 text-white rounded hover:bg-red-800 transition flex items-center gap-2"
				onClick={handleRestartClick}
			>
				Restart the quiz <VscDebugRestart />
			</button>
		</>
	)
}

export default MutiplePage
