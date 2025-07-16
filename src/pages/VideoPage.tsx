import React from "react"
import { Link } from "react-router"

const VideoPage: React.FC = () => {
	return (
		<div
			className="flex flex-col items-center justify-center p-4"
			style={{ minHeight: "80vh" }}
		>
			<div className="w-full max-w-3xl aspect-video mb-5">
				<h2 className="text-2xl mb-4 text-center">Video</h2>
				<iframe
					className="w-full h-full"
					src="https://www.youtube.com/embed/5mNRfdFr7WM"
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</div>
			<Link to="/mutiple" className="block text-center mt-8">
				Next
			</Link>
		</div>
	)
}

export default VideoPage
