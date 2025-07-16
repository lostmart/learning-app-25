import { Link } from "react-router"

const Home = () => {
	return (
		<main
			className="flex flex-col items-center justify-center"
			style={{ minHeight: "80vh" }}
		>
			<Link to="/video" className="text-2xl uppercase bg-blue-600 p-4">
				Start !
			</Link>
		</main>
	)
}

export default Home
