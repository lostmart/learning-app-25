"use client"

import { useEffect, useRef, useState } from "react"
import { FiPause, FiPlay, FiLoader } from "react-icons/fi"

type AudioPlayButtonProps = {
	audioUrl: string // URL of the audio file
	label?: string // Accessible label for the button
	preload?: "auto" | "metadata" | "none"
	onEnded?: () => void // Callback when audio ends
	className?: string
	style?: React.CSSProperties
}

export default function AudioPlayButton({
	audioUrl,
	label = "Play audio",
	preload = "metadata",
	onEnded,
	className,
}: AudioPlayButtonProps) {
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// Create/replace audio element when URL changes
	useEffect(() => {
		setError(null)
		setIsLoading(true)
		setIsPlaying(false)

		const audio = new Audio(audioUrl)
		audio.preload = preload
		audioRef.current = audio

		const onLoadedMeta = () => {
			setIsLoading(false)
		}

		const onPlay = () => setIsPlaying(true)
		const onPause = () => setIsPlaying(false)
		const onEndedLocal = () => {
			setIsPlaying(false)
			onEnded?.()
		}
		const onError = () => {
			setError("Failed to load audio.")
			setIsLoading(false)
		}

		audio.addEventListener("loadedmetadata", onLoadedMeta)
		audio.addEventListener("play", onPlay)
		audio.addEventListener("pause", onPause)
		audio.addEventListener("ended", onEndedLocal)
		audio.addEventListener("error", onError)

		return () => {
			audio.pause()
			audio.src = ""
			audio.removeEventListener("loadedmetadata", onLoadedMeta)
			audio.removeEventListener("play", onPlay)
			audio.removeEventListener("pause", onPause)
			audio.removeEventListener("ended", onEndedLocal)
			audio.removeEventListener("error", onError)
			audioRef.current = null
		}
	}, [audioUrl, preload, onEnded])

	const toggle = async () => {
		const audio = audioRef.current
		if (!audio) return

		try {
			if (audio.paused) {
				setIsLoading(true)
				await audio.play()
				setIsLoading(false)
			} else {
				audio.pause()
			}
		} catch (e) {
			setError("Playback was blocked by the browser.")
			setIsLoading(false)
		}
	}

	return (
		<div className={className}>
			<button
				type="button"
				onClick={toggle}
				aria-label={label}
				disabled={!!error}
				className="inline-flex items-center gap-2 rounded-xl px-4 py-2 shadow-sm cursor-pointer bg-white text-blue-500"
				style={{ top: "110px" }}
			>
				{error ? (
					"Error"
				) : isLoading ? (
					<FiLoader />
				) : isPlaying ? (
					<FiPause />
				) : (
					<FiPlay />
				)}
			</button>

			{error && (
				<p className="mt-2 text-red-600 text-sm" role="alert">
					{error}
				</p>
			)}
		</div>
	)
}
