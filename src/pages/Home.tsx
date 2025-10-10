import { Link } from "react-router"

const Home = () => {
	const linkskArray = [
		{
			link: "/video",
			text: "Video",
		},
		{
			link: "/presentation",
			text: "Presentation",
		},
		{
			link: "/fillIn",
			text: "FillIn",
		},
		{
			link: "/mutiple",
			text: "Multiple",
		},
		{
			link: "/writeOpt",
			text: "WriteOpt",
		},
		{
			link: "/final",
			text: "Final",
		},
	]

	return (
		<main
			className="flex flex-col items-center justify-center"
			style={{ minHeight: "80vh" }}
		>
			<h1 className="text-4xl">Welcome to the presentation</h1>
			{
				<>
					{linkskArray.map((link, i) => (
						<Link
							to={link.link}
							className="text-2xl uppercase bg-blue-600 p-4 mt-4"
							key={i}
						>
							{link.text}
						</Link>
					))}
				</>
			}
		</main>
	)
}

export default Home
