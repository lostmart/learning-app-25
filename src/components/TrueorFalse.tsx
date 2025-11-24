import { useState } from "react"
import type { TrueFalseSection } from "../services/types"
import ToggleSwitch from "./ui/ToggleSwitch"

const TrueorFalse = ({ section }: { section: TrueFalseSection }) => {
	// Initialize state for all answers (null = unanswered, true/false = answered)
	const [answers, setAnswers] = useState<(boolean | null)[]>(
		new Array(section.items.length).fill(null)
	)

	const handleToggle = (index: number, value: boolean) => {
		const newAnswers = [...answers]
		newAnswers[index] = value
		setAnswers(newAnswers)
	}

	return (
		<article>
			{section.type === "true_false" && (
				<>
					<h3 className="text-center">True of false</h3>
					<ul className="list-disc list-inside">
						{section.items.map((item, index) => (
							<li
								key={index}
								className="text-gray-100 flex justify-between items-center my-2"
							>
								{item}
								<ToggleSwitch
									value={answers[index] ?? false}
									onChange={(value) => handleToggle(index, value)}
								/>
							</li>
						))}
					</ul>
				</>
			)}
		</article>
	)
}

export default TrueorFalse
