// Updated RenderOptions.tsx

type RenderOptProps = {
	options: any[]
	handleButtonClick: (optionLetter: string) => void
}

const RenderOptions = ({ options, handleButtonClick }: RenderOptProps) => {
	return (
		<>
			{options.map((opt) => {
				return (
					<button
						onClick={() => handleButtonClick(opt.letter)}
						key={opt.letter}
						className="w-full p-2 mb-4 bg-blue-500 text-white cursor-pointer"
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
