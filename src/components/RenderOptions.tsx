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
						className="w-full p-1 mb-4 bg-blue-500 text-white cursor-pointer"
						type="button"
						style={{ maxWidth: "560px" }}
					>
						{opt}
					</button>
				)
			})}
		</>
	)
}

export default RenderOptions
