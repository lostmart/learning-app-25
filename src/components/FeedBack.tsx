import { AnimatePresence, motion } from "motion/react"

type FeedBackProps = {
	feedbackMessage: string
	showFeedback: boolean
}

const FeedBack = ({ feedbackMessage, showFeedback }: FeedBackProps) => {
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
						<h3 className="text-xl font-semibold mb-4">Feedback</h3>
						<p>{feedbackMessage}</p>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default FeedBack
