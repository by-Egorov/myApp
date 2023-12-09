import {useState} from 'react'
import {useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import {GiMechanicGarage} from 'react-icons/gi'
import {FaGasPump, FaShopify} from 'react-icons/fa'
import {IoIosAddCircleOutline, IoMdSpeedometer} from 'react-icons/io'
import style from './Home.module.scss'
import preloadCar from '../../assets/preloadCar.svg'
import Modal from '../../components/AddInfo/Modal.jsx'
import Start from '../Start/Start.jsx'
import {
    handleResetImage,
    handleShowAddImage,
} from '../../utils/Handlers/handlers.js'
import Card from '../../components/Card/Card.jsx'
import ModalContents from '../../components/ModalContent/ModalContents.jsx'

const Home = () => {
    const {register, handleSubmit} = useForm()
    const user = useSelector(state => state.user.user)
    const [addImage, setAddImage] = useState(false)
    const [selectedCardType, setSelectedCardType] = useState(null)
    const [userCarImage, setUserCarImage] = useState(
        JSON.parse(localStorage.getItem('userCarImage')) || null
    )

    const handleAddImage = data => {
        console.log(data.image)
        setUserCarImage(data.image)
        localStorage.setItem('userCarImage', JSON.stringify(data.image))
    }
    const handleCardClick = cardType => {
        setSelectedCardType(cardType)
    }
    const handleModalClose = () => {
        setSelectedCardType(null)
    }
    console.log(user)
    return (
        <>
            {user ? (
                <div className='container'>
                    <div
                        className={
                            selectedCardType
                                ? `${style.home} ${style.opacity}`
                                : `${style.home}`
                        }
                    >
                        <div className={style.home__title}>
                            <ul>
                                <li>{user.carBrand}</li>
                                <li>{user.carModel}</li>
                                <li>{user.carYear} year</li>
                            </ul>
                        </div>
                        <div className={style.home__image}>
                            {userCarImage ? (
                                <div
                                    className={style.home__image_preload}
                                    onClick={() => handleShowAddImage(setAddImage)}
                                >
                                    <img src={userCarImage} alt='userCarImage'/>
                                    <button onClick={() => handleResetImage(setUserCarImage)}>
                                        reset
                                    </button>
                                </div>
                            ) : (
                                <div className={style.home__image_preload}>
                                    <div className={style.home__image_preload_img}>
                                        <img src={preloadCar} alt='preload'/>
                                    </div>
                                    <div className={style.home__image_preload_add}>
                                        <IoIosAddCircleOutline
                                            size={50}
                                            color={'#c5c5c5'}
                                            onClick={() => handleShowAddImage(setAddImage, addImage)}
                                        />
                                        {addImage && (
                                            <div>
                                                <form onSubmit={handleSubmit(handleAddImage)}>
                                                    <input {...register('image')} />
                                                    <button type='submit'>send</button>
                                                </form>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={style.home__cards}>
                            <Card
                                title='Spares'
                                icon={<GiMechanicGarage size={50}/>}
                                bodyContent={
                                    <>
                                        <div className={style.card__body_title}>Total price:</div>
                                        <div className={style.card__body_sum}>2300 р</div>
                                    </>
                                }
                                handleClick={() => handleCardClick('spares')}
                                button={<IoIosAddCircleOutline size={30}/>}
                            />
                            <Card
                                title='Gasoline'
                                icon={<FaGasPump size={50}/>}
                                bodyContent={
                                    <>
                                        <div className={style.card__body_title}>Total price:</div>
                                        <div className={style.card__body_sum}>0 р</div>
                                    </>
                                }
                                handleClick={() => handleCardClick('gasoline')}
                                button={<IoIosAddCircleOutline size={30}/>}
                            />
                            <Card
                                title='Mileage'
                                icon={<IoMdSpeedometer size={50}/>}
                                bodyContent={
                                    <>
                                        <span> {user.carMileage} km </span>
                                    </>
                                }
                            />
                            <Card
                                title='Accessories'
                                icon={<FaShopify size={50}/>}
                                bodyContent={
                                    <>
                                        <div className={style.card__body_title}>Total price:</div>
                                        <div className={style.card__body_sum}>2300 р</div>
                                    </>
                                }
                                handleClick={() => handleCardClick('accessories')}
                                button={<IoIosAddCircleOutline size={30}/>}
                            />
                        </div>
                    </div>
                    {selectedCardType && (
                        <Modal
                            onClick={handleModalClose}
                            cardContent={ModalContents[selectedCardType]}
                        />
                    )}
                </div>
            ) : (
                <Start/>
            )}
        </>
    )
}

export default Home
