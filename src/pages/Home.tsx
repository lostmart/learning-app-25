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
			<Link
				to="/presentation"
				className="text-2xl uppercase bg-blue-600 p-4 mt-4"
			>
				Presentation
			</Link>
			<Link to="/fillIn" className="text-2xl uppercase bg-blue-600 p-4 mt-4">
				fillIn
			</Link>
			<Link to="/mutiple" className="text-2xl uppercase bg-blue-600 p-4 mt-4">
				Multiple
			</Link>
			<Link to="/writeOpt" className="text-2xl uppercase bg-blue-600 p-4 mt-4">
				WriteOpt
			</Link>
			<Link to="/final" className="text-2xl uppercase bg-blue-600 p-4 mt-4">
				Final
			</Link>
			<Link to="/error" className="text-2xl uppercase bg-blue-600 p-4 mt-4">
				Error
			</Link>
			<Link to="/about" className="text-2xl uppercase bg-blue-600 p-4 mt-4">
				About
			</Link>
		</main>
	)
}

export default Home
