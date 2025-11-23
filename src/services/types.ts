export interface LessonData {
	title: string
	difficulty: string
	sections: Section[]
	tex?: string
}

export type Section =
	| ReadingSection
	| TrueFalseSection
	| QuestionsSection
	| FillInBlanksSection
	| MatchingSection

export interface ReadingSection {
	type: "reading"
	title: string
	difficulty: string
	text: string
}

export interface TrueFalseSection {
	type: "true_false"
	title: string
	difficulty: string
	items: string[]
	answers: string[]
}

export interface QuestionsSection {
	type: "questions"
	title: string
	difficulty: string
	questions: string[]
	answers: string[]
}

export interface FillInBlanksSection {
	type: "fill_in_the_blanks"
	title: string
	difficulty: string
	word_bank: string[]
	sentences: string[]
	answers: string[]
}

export interface MatchingSection {
	type: "matching"
	title: string
	difficulty: string
	items: string[]
	instructions: string
	answers: string[]
}
