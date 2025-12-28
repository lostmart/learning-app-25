import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./pages/Home"
import MutiplePage from "./pages/MutiplePage"
import Error from "./pages/Error"
import FillInBlank from "./pages/FillInBlank"
import WriteOptions from "./pages/WriteOptions"
import VideoPage from "./pages/VideoPage"
import Final from "./pages/Final"
import Presentation from "./pages/Presentation"
import About from "./pages/About"
import ReviewCards from "./pages/ReviewCards"
import { LessonProvider } from "./context/LessonContext"

const App = () => {
	return (
		<LessonProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/mutiple" element={<MutiplePage />} />
					<Route path="/fillIn" element={<FillInBlank />} />
					<Route path="/writeOpt" element={<WriteOptions />} />
					<Route path="/video" element={<VideoPage />} />
					<Route path="/final" element={<Final />} />
					<Route path="/presentation" element={<Presentation />} />
					<Route path="/about" element={<About />} />
					<Route path="/reviewCards" element={<ReviewCards />} />
					<Route path="*" element={<Error />} />
				</Routes>
				<footer className="text-center p-4 border-t mt-8">
					{/* <Link to="/" className="text-blue-600 hover:underline">
						Go Home
					</Link> */}
				</footer>
			</BrowserRouter>
		</LessonProvider>
	)
}

export default App
