// Updated MutiplePage.tsx
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import PointsHolder from "../components/PointsHolder"
import ExerciseHeader from "../components/ExerciseHeader"
import RenderOptions from "../components/RenderOptions"
import FeedBack from "../components/FeedBack"
import { TbPlayerTrackNext } from "react-icons/tb"
import { VscDebugRestart } from "react-icons/vsc"

// Add interfaces here or import from types file
// interface QuizOption {
// 	letter: string
// 	text: string
// }

interface QuizQuestion {
	id: number
	text: string
	options: any[]
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

	useEffect(() => {
		fetch("lessons/london-quizz.json")
			.then((response) => response.json())
			.then((data) => {
				console.log("Fetched data:", data)
				setExerciseData(data)
				setQuestionIndex(0)
			})
			.catch((error) => {
				console.error("Error fetching data:", error)
			})
	}, [])

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
			if (
				optionLetter === currentQuestion.correctAnswer &&
				questionIndex < exerciseData.questions.length - 1
			) {
				setQuestionIndex((prev) => prev + 1)
			} else {
				// Quiz finished - navigate somewhere or show results
				setFeedbackMessage("Quizz finished!")
				return
			}
		}, 1300)
	}

	const handleSkipClick = () => {
		if (!exerciseData) return

		if (questionIndex < exerciseData.questions.length - 1) {
			setQuestionIndex((prev) => prev + 1)
		} else {
			// Quiz finished - navigate somewhere or show results
			alert("Quiz finished!")
		}
	}

	const handleRestartClick = () => {
		setQuestionIndex(0)
		setPoints(0)
	}

	if (!exerciseData) {
		return <div>Loading...</div>
	}

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
			{/* <button
				onClick={handleNext}
				className="block text-center cursor-pointer mx-auto mb-8 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
			>
				Next
			</button> */}
			{/* feedback modal */}
			{showFeedback && (
				<FeedBack
					feedbackMessage={feedbackMessage}
					showFeedback={showFeedback}
					correctAnswer={correctAnswer}
				/>
			)}
			<PointsHolder score={points} />
			<button
				className="block text-center cursor-pointer mx-auto m-4 px-6 py-2 bg-red-900 text-white rounded hover:bg-blue-700 transition flex items-center gap-2"
				onClick={handleRestartClick}
			>
				Restart the quizz <VscDebugRestart />
			</button>
		</>
	)
}

export default MutiplePage
