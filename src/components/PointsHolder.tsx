type PointsHolderPops = {
	score: number
}

const PointsHolder = ({ score }: PointsHolderPops) => {
	return <span>Score: {score}</span>
}

export default PointsHolder
