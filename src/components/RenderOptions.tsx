// Updated RenderOptions.tsx

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

	return (
		<div className="flex flex-col items-center">
			{options.map((opt, i) => {
				return (
					<button
						onClick={() => handleButtonClick(opt.letter)}
						key={i}
						className={`w-full p-2 mb-4 text-white cursor-pointer ${colorsArray[i]} ${hoverColorsArray[i]} font-medium `}
						type="button"
						style={{ maxWidth: "560px" }}
					>
						{opt.letter.toUpperCase()}) {opt.text}
					</button>
				)
			})}
		</div>
	)
}

export default RenderOptions
