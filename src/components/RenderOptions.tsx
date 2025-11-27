// Updated RenderOptions.tsx

type RenderOptProps = {
	options: any[]
	handleButtonClick: (optionLetter: string) => void
}

const RenderOptions = ({ options, handleButtonClick }: RenderOptProps) => {
	return (
		<>
			{options.map((opt, i) => {
				return (
					<button
						onClick={() => handleButtonClick(opt.letter)}
						key={i}
						className={`w-full p-2 mb-4 text-white cursor-pointer hover:bg-blue-500 font-medium bg-blue-${6 + i}00`}
						type="button"
						style={{ maxWidth: "560px" }}
					>
						{opt.letter.toUpperCase()}) {opt.text}
					</button>
				)
			})}
		</>
	)
}

export default RenderOptions
