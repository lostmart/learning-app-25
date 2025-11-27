interface ToggleSwitchProps {
	value: boolean
	onChange: (value: boolean) => void
}

const ToggleSwitch = ({ value, onChange }: ToggleSwitchProps) => {
	return (
		<button
			type="button"
			onClick={() => onChange(!value)}
			className={`
        relative w-[74px] h-8 rounded-full transition-colors duration-300
        flex items-center px-2
        ${
					value
						? "bg-green-500 justify-start"
						: "bg-gray-300 justify-end text-gray-700"
				}
      `}
			aria-label={value ? "True" : "False"}
		>
			<span
				className={`
          absolute top-1 left-1 w-6 h-6 bg-white rounded-full
          transition-transform duration-300
          ${value ? "translate-x-10" : "translate-x-0"}
        `}
			/>
			{value ? "True" : "False"}
		</button>
	)
}

export default ToggleSwitch
