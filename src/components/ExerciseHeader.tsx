import { useState } from "react"

type ExrciseProps = {
	titleText: string
	imageUrl: string
	className?: string
}

const ExerciseHeader = ({ titleText, imageUrl, className }: ExrciseProps) => {
	const [mediaLoaded, setMediaLoaded] = useState(false)

	const handleLoad = () => {
		console.log("loaded !!!")
		setMediaLoaded(true)
	}

	return (
		<header className={className ? className : ""}>
			<h2 className="text-xl my-2">{titleText}</h2>

			<figure
				className={!mediaLoaded ? "animate-pulse" : ""}
				style={{
					width: "100%",
					minWidth: "360px",
					background:
						"linear-gradient(90deg, rgb(69 69 69) 0%, rgb(133 133 133) 100%)",
					maxWidth: "560px",
					aspectRatio: "16/9",
					display: "block",
				}}
			>
				<img
					className={
						!mediaLoaded
							? "rounded-sm mb-2 transition-opacity opacity-0 ease-in-out"
							: "rounded-sm mb-2 transition-opacity opacity-100"
					}
					src={imageUrl}
					alt="no temas a la noche oscura"
					onLoad={handleLoad}
				/>
			</figure>
		</header>
	)
}

export default ExerciseHeader
