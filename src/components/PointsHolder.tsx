type PointsHolderPops = {
	score: number
}

const PointsHolder = ({ score }: PointsHolderPops) => {
	return (
		<div className="flex items-center justify-center">
			<p className="text-xl font-bold">Score: {score}</p>
		</div>
	)
}

export default PointsHolder
