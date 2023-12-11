import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Pages/Registration/Register.jsx'
import Home from './Pages/Home/Home'
import CardDescription from './Pages/CardDescription/CardDescription'

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Register />} />
				<Route path='/card' element={<CardDescription />} />
			</Routes>
		</Router>
	)
}

export default App
