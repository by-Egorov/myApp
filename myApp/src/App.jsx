import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Start from './Pages/Start/Start'
import Home from './Pages/Home/Home'

const App = () => {

    return (
        <Router>
            <Routes>
            <Route path='/' element={<Home/>}/>
                <Route path='/start' element={<Start/>}/>
            </Routes>
        </Router>
    )
}

export default App
