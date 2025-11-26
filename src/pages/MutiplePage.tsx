// Updated MutiplePage.tsx
import { useEffect, useState } from "react"
import PointsHolder from "../components/PointsHolder"
import ExerciseHeader from "../components/ExerciseHeader"
import RenderOptions from "../components/RenderOptions"

import dadImg from "../assets/london.jpeg"

// Add interfaces here or import from types file
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
			setFeedbackMessage("Correct!")
			if (questionIndex < exerciseData.questions.length - 1) {
				setQuestionIndex((prev) => prev + 1)
			} else {
				// Quiz finished - navigate somewhere or show results
				console.log("Quiz finished!")
			}
		} else {
			setFeedbackMessage("Incorrect!")
		}

		setTimeout(() => {
			setShowFeedback(false)
		}, 1300)
	}

	// const handleNext = () => {
	// 	if (!exerciseData) return

	// 	if (questionIndex < exerciseData.questions.length - 1) {
	// 		setQuestionIndex((prev) => prev + 1)
	// 	} else {
	// 		// Quiz finished - navigate somewhere or show results
	// 		console.log("Quiz finished!")
	// 	}
	// }

	if (!exerciseData) {
		return <div>Loading...</div>
	}

	const currentQuestion = exerciseData.questions[questionIndex]

	return (
		<>
			<PointsHolder score={points} />
			<main style={{ minHeight: "80vh" }}>
				<h2 className="text-center text-xl">{exerciseData.title}</h2>
				<p className="text-center text-slate-600">{exerciseData.description}</p>
				<div className="flex flex-col items-center p-2 max-w-3xl mx-auto relative md:flex-row md:gap-4">
					<ExerciseHeader
						titleText={currentQuestion.text}
						className="mb-4 text-center md:w-[70%]"
						imageUrl={currentQuestion?.imageUrl}
					/>
					<div className="w-full md:w-[25%]">
						<RenderOptions
							options={currentQuestion.options}
							handleButtonClick={handleButtonClick}
						/>
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
				<div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center">
					<div className="bg-slate-900 p-6 rounded shadow-lg max-w-md w-full">
						<h3 className="text-xl font-semibold mb-4">Feedback</h3>
						<p className="mb-4">
							You selected:{" "}
							{
								currentQuestion.options.find(
									(option) => option.letter === currentQuestion.correctAnswer
								)?.text
							}
						</p>
						<p>{feedbackMessage}</p>
					</div>
				</div>
			)}
		</>
	)
}

export default MutiplePage
