import React from "react"

type ButtonCompProps = {
	text: string
	classNames: string
	theClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ButtonComp = ({ text, classNames, theClick }: ButtonCompProps) => {
	return (
		<button onClick={(e) => theClick(e)} className={classNames}>
			{text}
		</button>
	)
}

export default ButtonComp
