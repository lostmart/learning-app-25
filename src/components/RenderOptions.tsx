type renderOptProps = {
	options: string[]
	handleButtonClick: (opt: string) => void
}

const RenderOptions = ({ options, handleButtonClick }: renderOptProps) => {
	return (
		<>
			{options.map((opt) => {
				return (
					<button
						onClick={() => handleButtonClick(opt)}
						key={opt}
						className="w-full p-1 mb-3 bg-blue-500 text-white"
					>
						{opt}
					</button>
				)
			})}
		</>
	)
}

export default RenderOptions
