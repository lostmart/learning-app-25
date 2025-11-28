import { useState } from "react"

type ExrciseProps = {
	titleText?: string
	imageUrl?: string
	className?: string
}

const ExerciseHeader = ({ titleText, imageUrl, className }: ExrciseProps) => {
	const [mediaLoaded, setMediaLoaded] = useState(false)

	const handleLoad = () => {
		console.log("loaded !!!")
		setMediaLoaded(true)
	}

	return (
		<>
			<header className={className ? className : ""}>
				<h2 className="text-xl my-2">{titleText}</h2>
				<figure
					className={
						!mediaLoaded
							? "animate-pulse"
							: "" + " w-full block max-w-[560px] md:max-w-[680px] mx-auto mb-4"
					}
					style={{
						background:
							"linear-gradient(90deg, rgb(69 69 69) 0%, rgb(133 133 133) 100%)",
					}}
				>
					<img
						className={
							!mediaLoaded
								? "rounded-sm mb-2 transition-opacity opacity-0 ease-in-out"
								: "rounded-sm mb-2 transition-opacity opacity-100 object-cover aspect-video ease-in-out w-full"
						}
						src={imageUrl}
						alt="Exercise media"
						onLoad={handleLoad}
					/>
				</figure>
			</header>
		</>
	)
}

export default ExerciseHeader
