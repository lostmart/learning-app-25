import { useState, useEffect } from "react"

type ExrciseProps = {
	titleText?: string
	imageUrl?: string
	className?: string
}

const imageAnimationStyle = `
	@keyframes fadeInImage {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.animate-fadeInImage {
		animation: fadeInImage 0.6s ease-in-out 200ms forwards;
		opacity: 0;
	}
`

const ExerciseHeader = ({ titleText, imageUrl, className }: ExrciseProps) => {
	const [showTitle, setShowTitle] = useState(true)
	const [showImage, setShowImage] = useState(false)

	useEffect(() => {
		console.log("ExerciseHeader mounted")
		setShowTitle(!!titleText)
		const imageTimer = setTimeout(() => {
			setShowImage(true)
		}, 1000)

		return () => clearTimeout(imageTimer)
	}, [])

	return (
		<>
			<style>{imageAnimationStyle}</style>
			<header className={className ? className : ""}>
				<h2
					className={`text-xl my-2 transition-opacity duration-500 ${
						showTitle ? "opacity-100" : "opacity-0"
					}`}
				>
					{titleText}
				</h2>
				{showImage && (
					<figure
						className="w-full block max-w-[560px] md:max-w-[680px] mx-auto mb-4 animate-fadeIn min-h-[201px]"
						style={{
							aspectRatio: "16 / 9",
							background:
								"linear-gradient(90deg, rgb(69 69 69) 0%, rgb(133 133 133) 100%)",
						}}
					>
						<img
							className="rounded-sm mb-2 animate-fadeInImage object-cover w-full h-full"
							src={imageUrl}
							alt="Exercise media"
						/>
					</figure>
				)}
			</header>
		</>
	)
}

export default ExerciseHeader
