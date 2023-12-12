import Modal from '../../components/AddInfo/Modal.jsx'
import Register from '../Registration/Register.jsx'
import ModalContents from '../../components/ModalContent/ModalContents.jsx'
import UserData from "../../components/UserData/UserData.jsx"
import {useSelector} from "react-redux";

const Home = () => {
    const user = useSelector(state => state.user.user)

    return (
        <>
            {user ? (
                <div className='container'>
                    <UserData/>
                </div>
            ) : (
                <Register/>
            )}
        </>
    )
}

export default Home
