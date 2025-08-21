"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type AudioPlayButtonProps = {
	audioUrl: string // URL of the audio file
	label?: string // Accessible label for the button
	preload?: "auto" | "metadata" | "none"
	onEnded?: () => void // Callback when audio ends
	className?: string
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
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState<number | null>(null)

	// Create/replace audio element when URL changes
	useEffect(() => {
		setError(null)
		setIsLoading(true)
		setIsPlaying(false)
		setCurrentTime(0)
		setDuration(null)

		const audio = new Audio(audioUrl)
		audio.preload = preload
		audioRef.current = audio

		const onLoadedMeta = () => {
			setDuration(Number.isFinite(audio.duration) ? audio.duration : null)
			setIsLoading(false)
		}
		const onTimeUpdate = () => setCurrentTime(audio.currentTime)
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
		audio.addEventListener("timeupdate", onTimeUpdate)
		audio.addEventListener("play", onPlay)
		audio.addEventListener("pause", onPause)
		audio.addEventListener("ended", onEndedLocal)
		audio.addEventListener("error", onError)

		return () => {
			audio.pause()
			audio.src = ""
			audio.removeEventListener("loadedmetadata", onLoadedMeta)
			audio.removeEventListener("timeupdate", onTimeUpdate)
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

	const fmt = useMemo(
		() => (s?: number | null) => {
			if (s == null || !Number.isFinite(s)) return "--:--"
			const m = Math.floor(s / 60)
			const ss = Math.floor(s % 60)
				.toString()
				.padStart(2, "0")
			return `${m}:${ss}`
		},
		[]
	)

	return (
		<div className={className}>
			<button
				type="button"
				onClick={toggle}
				aria-label={label}
				disabled={!!error}
				className="inline-flex items-center gap-2 rounded-xl px-4 py-2 shadow-sm border"
			>
				{error
					? "Error"
					: isLoading
					? "Loading…"
					: isPlaying
					? "Pause"
					: "Play"}
			</button>

			<span className="ml-3 text-sm tabular-nums">
				{fmt(currentTime)} / {fmt(duration)}
			</span>

			{error && (
				<p className="mt-2 text-red-600 text-sm" role="alert">
					{error}
				</p>
			)}
		</div>
	)
}
