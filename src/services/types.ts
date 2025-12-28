// ============================================
// LESSON STRUCTURE
// ============================================

export interface LessonData {
	id: string
	title: string
	difficulty: string // "A1", "A2", "B1", etc.
	sections: Section[]
}

// MVP Sections (4 types)
export type Section =
	| ReadingSection
	| TrueFalseSection
	| MultipleChoiceSection
	| FillInBlanksSection

// Future sections (commented out for MVP)
// | QuestionsSection
// | MatchingSection

// ============================================
// SECTION TYPES
// ============================================

export interface ReadingSection {
	type: "reading"
	text: string
}

export interface TrueFalseSection {
	type: "true_false"
	items: string[] // Statements to evaluate
	answers: boolean[] // true or false for each
}

export interface MultipleChoiceSection {
	type: "multiple_choice"
	questions: MultipleChoiceQuestion[]
}

export interface FillInBlanksSection {
	type: "fill_in_the_blanks"
	word_bank: string[]
	sentences: string[] // Sentences with _______ placeholders
	answers: string[] // Correct word for each blank
}

// ============================================
// SUB-TYPES
// ============================================

export interface MultipleChoiceQuestion {
	id: number
	text: string
	options: QuizOption[]
	correctAnswer: string // Letter: "A", "B", "C", or "D"
	imageUrl?: string // Optional image
	note?: string // Optional explanation
}

export interface QuizOption {
	letter: string // "A", "B", "C", "D"
	text: string
}

// ============================================
// SCORE TRACKING
// ============================================

export interface LessonScore {
	totalCorrect: number
	totalQuestions: number
}

// Helper to calculate percentage
export const calculatePercentage = (score: LessonScore): number => {
	if (score.totalQuestions === 0) return 0
	return Math.round((score.totalCorrect / score.totalQuestions) * 100)
}

// ============================================
// FUTURE TYPES (commented out for V2)
// ============================================

/*
export interface QuestionsSection {
  type: "questions"
  questions: string[]
  answers: string[]
}

export interface MatchingSection {
  type: "matching"
  items: string[]
  instructions: string
  answers: string[]
}
*/
