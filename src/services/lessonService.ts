import { fetchData } from "./api"
import * as Types from "./types"

// Fetch a specific lesson by ID/name
export async function getLesson(lessonId: string): Promise<Types.LessonData> {
	return fetchData<Types.LessonData>(`/${lessonId}.json`)
}

// Fetch all lessons (if you have an index file later)
export async function getAllLessons(): Promise<Types.LessonData[]> {
	return fetchData<Types.LessonData[]>("/index.json")
}

// Get a specific section type from a lesson
export function getSectionByType<
	T extends Types.LessonData["sections"][number]
>(lesson: Types.LessonData, type: T["type"]): T | undefined {
	return lesson.sections.find((section) => section.type === type) as
		| T
		| undefined
}

// Helper to get reading section specifically
export function getReadingSection(lesson: Types.LessonData) {
	return getSectionByType(lesson, "reading")
}

// Helper to get exercise sections (everything except reading)
export function getExerciseSections(lesson: Types.LessonData) {
	return lesson.sections.filter((section) => section.type !== "reading")
}
