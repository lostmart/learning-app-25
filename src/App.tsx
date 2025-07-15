import { BrowserRouter, Routes, Route, Link } from "react-router"
import Home from "./pages/Home"
import MutiplePage from "./pages/MutiplePage"
import Error from "./pages/Error"
import FillInBlank from "./pages/FillInBlank"
import WriteOptions from "./pages/WriteOptions"
import VideoPage from "./pages/VideoPage"

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/mutiple" element={<MutiplePage />} />
					<Route path="/fillIn" element={<FillInBlank />} />
					<Route path="/writeOpt" element={<WriteOptions />} />
					<Route path="/video" element={<VideoPage />} />
					<Route path="*" element={<Error />} />
				</Routes>
				<footer className="text-center p-4 border-t mt-8">
					<Link to="/" className="text-blue-600 hover:underline">
						Go Home
					</Link>
				</footer>
			</BrowserRouter>
		</>
	)
}

export default App
