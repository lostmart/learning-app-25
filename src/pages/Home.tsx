import { Link } from "react-router"

const Home = () => {
	return (
		<main
			className="flex flex-col items-center justify-center"
			style={{ minHeight: "85vh" }}
		>
			<Link to="/video">Start !</Link>
		</main>
	)
}

export default Home
