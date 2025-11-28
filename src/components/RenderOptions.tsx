import { motion } from "motion/react"

type RenderOptProps = {
	options: any[]
	handleButtonClick: (optionLetter: string) => void
}

const RenderOptions = ({ options, handleButtonClick }: RenderOptProps) => {
	const colorsArray = [
		"bg-teal-700",
		"bg-cyan-700",
		"bg-blue-600",
		"bg-indigo-600",
		"bg-green-600",
		"bg-yellow-500",
		"bg-purple-500",
		"bg-pink-500",
		"bg-red-500",
		"bg-orange-500",
		"bg-amber-500",
	]

	const hoverColorsArray = [
		"hover:bg-teal-800",
		"hover:bg-cyan-800",
		"hover:bg-blue-800",
		"hover:bg-indigo-700",
		"hover:bg-green-700",
		"hover:bg-yellow-600",
		"hover:bg-purple-600",
		"hover:bg-pink-600",
		"hover:bg-red-600",
		"hover:bg-orange-600",
		"hover:bg-amber-600",
	]

	// Container animation controls stagger timing
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
		},
	}

	return (
		<motion.div
			className="flex flex-col items-center"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{options.map((opt, i) => {
				const buttonVariants = {
					hidden: {
						opacity: 0,

						x: -20,
					},
					visible: {
						opacity: 1,
						x: 0,
						transition: {
							duration: 0.4,
							delay: i === 0 ? 2 : 2 + 0.7 + i * 0.8, // First button at 1s, others after first completes
						},
					},
				}

				return (
					<motion.button
						variants={buttonVariants}
						onClick={() => handleButtonClick(opt.letter)}
						key={i}
						className={`w-full p-2 mb-4 text-white cursor-pointer ${colorsArray[i]} ${hoverColorsArray[i]} font-medium max-w-[560px] flex items-center justify-center gap-2 rounded`}
						type="button"
						whileHover={{ scale: 1.02 }} // Bonus: subtle hover effect
						whileTap={{ scale: 0.98 }} // Bonus: click feedback
					>
						{opt.letter.toUpperCase()}) {opt.text}
					</motion.button>
				)
			})}
		</motion.div>
	)
}

export default RenderOptions
