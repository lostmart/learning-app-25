import { useState } from "react"

const ReviewCards = () => {
	const [isFlipped, setIsFlipped] = useState(false)

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 flex flex-col items-center justify-center p-4">
			{/* Header */}
			<div className="mb-8 bg-white rounded-full px-6 py-2 flex items-center gap-2 shadow-lg">
				<span className="text-2xl">🎯</span>
				<span className="font-semibold text-gray-800">Flashcards</span>
			</div>

			{/* Card Container */}
			<div
				className="relative w-full max-w-2xl h-96 cursor-pointer"
				style={{ perspective: "1000px" }}
				onClick={() => setIsFlipped(!isFlipped)}
			>
				{/* Card Inner (handles flip) */}
				<div
					className={`relative w-full h-full transition-transform duration-700 ${
						isFlipped ? "[transform:rotateY(180deg)]" : ""
					}`}
					style={{ transformStyle: "preserve-3d" }}
				>
					{/* Front Face */}
					<div
						className="absolute w-full h-full bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center"
						style={{ backfaceVisibility: "hidden" }}
					>
						<h2 className="text-2xl text-gray-800 mb-6 text-center">
							"Do you like to play tennis?"
						</h2>
						<img
							src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=500&h=300&fit=crop"
							alt="Tennis players"
							className="w-80 h-52 object-cover rounded-xl shadow-lg"
						/>
						<div className="mt-6 text-3xl text-gray-600">↻</div>
					</div>

					{/* Back Face */}
					<div
						className="absolute w-full h-full bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center"
						style={{
							backfaceVisibility: "hidden",
							transform: "rotateY(180deg)",
						}}
					>
						<h2 className="text-2xl text-gray-400 mb-8 text-center">
							"Do you like to play tennis?"
						</h2>
						<p className="text-3xl text-gray-800 text-center">No, I don't.</p>
						<div className="mt-12 text-3xl text-gray-600">↻</div>
					</div>
				</div>
			</div>

			{/* Bottom Buttons */}
			<div className="flex gap-4 mt-8">
				<button className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl text-gray-600 hover:bg-gray-50 transition-colors">
					✕
				</button>
				<button className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl text-gray-600 hover:bg-gray-50 transition-colors">
					✓
				</button>
			</div>
		</div>
	)
}

export default ReviewCards
