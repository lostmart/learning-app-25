import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ReadingPanelProps {
	text: string
	initiallyOpen?: boolean
}

const ReadingPanel = ({ text, initiallyOpen = false }: ReadingPanelProps) => {
	const [isOpen, setIsOpen] = useState(initiallyOpen)

	const togglePanel = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className="w-full max-w-4xl mx-auto mb-6">
			{/* Toggle Button */}
			<button
				onClick={togglePanel}
				className="w-full flex items-center justify-between px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors shadow-md"
				aria-expanded={isOpen}
				aria-controls="reading-content"
			>
				<span className="flex items-center gap-2 text-lg font-medium">
					<span>📖</span>
					<span>Reading Reference</span>
				</span>

				<motion.span
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.3 }}
					className="text-2xl"
				>
					▼
				</motion.span>
			</button>

			{/* Collapsible Content */}
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						id="reading-content"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{
							height: { duration: 0.3 },
							opacity: { duration: 0.2 },
						}}
						className="overflow-hidden"
					>
						<div className="px-6 py-5 bg-slate-900 border border-slate-700 rounded-b-lg">
							<p className="text-slate-100 leading-relaxed text-lg">{text}</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default ReadingPanel
