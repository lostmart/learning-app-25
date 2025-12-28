import { createContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import type { LessonData, LessonScore } from "../services/types"

// ============================================
// CONTEXT TYPE DEFINITION
// ============================================

interface LessonContextType {
	lessonData: LessonData | null
	score: LessonScore
	addScore: (correct: number, total: number) => void
	resetScore: () => void
	loading: boolean
	error: string | null
}

// ============================================
// CREATE CONTEXT
// ============================================

export const LessonContext = createContext<LessonContextType | undefined>(
	undefined
)

// ============================================
// PROVIDER COMPONENT
// ============================================

interface LessonProviderProps {
	children: ReactNode
}

export const LessonProvider = ({ children }: LessonProviderProps) => {
	// State management
	const [lessonData, setLessonData] = useState<LessonData | null>(null)
	const [score, setScore] = useState<LessonScore>({
		totalCorrect: 0,
		totalQuestions: 0,
	})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// Fetch lesson data on mount
	useEffect(() => {
		const fetchLesson = async () => {
			try {
				setLoading(true)
				const response = await fetch("/lessons/lesson-1.json")

				if (!response.ok) {
					throw new Error(`Failed to load lesson: ${response.statusText}`)
				}

				const data = await response.json()
				setLessonData(data)
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load lesson")
				console.error("Error loading lesson:", err)
			} finally {
				setLoading(false)
			}
		}

		fetchLesson()
	}, [])

	// Add score from an exercise
	const addScore = (correct: number, total: number) => {
		setScore((prev) => ({
			totalCorrect: prev.totalCorrect + correct,
			totalQuestions: prev.totalQuestions + total,
		}))
	}

	// Reset score (for restart)
	const resetScore = () => {
		setScore({
			totalCorrect: 0,
			totalQuestions: 0,
		})
	}

	// Context value
	const value: LessonContextType = {
		lessonData,
		score,
		addScore,
		resetScore,
		loading,
		error,
	}

	return (
		<LessonContext.Provider value={value}>{children}</LessonContext.Provider>
	)
}
