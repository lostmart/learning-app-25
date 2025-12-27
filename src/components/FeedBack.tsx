import { AnimatePresence, motion } from "motion/react"
import { FiAlertTriangle } from "react-icons/fi"
import { TiTick } from "react-icons/ti"

type FeedBackProps = {
	feedbackMessage: string
	showFeedback: boolean
	correctAnswer: boolean
}

const positiveFeedback = [
	"Well done!",
	"Great job!",
	"You're correct!",
	"Excellent work!",
	"Keep it up!",
]

const negativeFeedback = [
	"Incorrect",
	"Try again",
	"Mmm ... not quite",
	"Wrong answer",
	"Give it another shot",
]

const FeedBack = ({
	feedbackMessage,
	showFeedback,
	correctAnswer,
}: FeedBackProps) => {
	return (
		<AnimatePresence>
			{showFeedback && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center"
				>
					<motion.div
						initial={{ y: -100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -100, opacity: 0 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						className="bg-slate-900 p-6 rounded shadow-lg max-w-md w-full"
					>
						<h3 className="text-xl text-center font-semibold mb-4">Feedback</h3>
						<p
							className={
								correctAnswer
									? "text-green-500 " +
									  " flex items-center justify-center gap-2"
									: "text-red-500 " + " flex items-center justify-center gap-2"
							}
						>
							{feedbackMessage}
							{correctAnswer ? <TiTick /> : <FiAlertTriangle />}
						</p>
						<p className="my-4 text-center">
							{correctAnswer
								? positiveFeedback[Math.floor(Math.random() * 5)]
								: negativeFeedback[Math.floor(Math.random() * 5)]}
						</p>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default FeedBack
