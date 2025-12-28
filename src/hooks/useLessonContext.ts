import { useContext } from "react"
import { LessonContext } from "../context/LessonContext"

/**
 * Custom hook to use LessonContext
 * Throws error if used outside of LessonProvider
 */
export const useLessonContext = () => {
	const context = useContext(LessonContext)

	if (context === undefined) {
		throw new Error("useLessonContext must be used within a LessonProvider")
	}

	return context
}
