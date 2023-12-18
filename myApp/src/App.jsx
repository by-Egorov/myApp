import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Pages/Registration/Register.jsx'
import Home from './Pages/Home/Home'
import { $authHost } from './axios.js'

const App = () => {

	useEffect(() => {
		const fetchData = async() => {
			try {
				const {data} = await $authHost.get('/user/me')
				console.log(data)
				localStorage.setItem('user', JSON.stringify(data))
			} catch (error) {
				console.log(error)
			}
		}
		fetchData()
	}, [])

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Register />} />
			</Routes>
		</Router>
	)
}

export default App
