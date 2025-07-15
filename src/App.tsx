import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./pages/Home"
import MutiplePage from "./pages/MutiplePage"
import Error from "./pages/Error"
import FillInBlank from "./pages/FillInBlank"
import WriteOptions from "./pages/WriteOptions"

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/mutiple" element={<MutiplePage />} />
				<Route path="/fillIn" element={<FillInBlank />} />
				<Route path="/writeOpt" element={<WriteOptions />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
