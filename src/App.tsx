import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./pages/Home"
import MutiplePage from "./pages/MutiplePage"
import Error from "./pages/Error"

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/mutiple" element={<MutiplePage />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
