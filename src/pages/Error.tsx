import { Link } from "react-router"

const Error = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<p>404 error, maybe</p>

			<Link to="/" className="underline">
				go back
			</Link>
		</div>
	)
}

export default Error
