import { useSelector } from 'react-redux'
import Register from '../Registration/Register.jsx'
import UserData from '../../components/UserData/UserData.jsx'

const Home = () => {
	const user = useSelector(state => state.user.user)

	return <>{user ? <UserData /> : <Register />}</>
}

export default Home
