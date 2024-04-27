//React
import {useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
//Style
import style from '../../components/UserData/UserData.module.scss'
//Utils
import {handleShowAddImage} from '../../utils/Handlers/handlers.js'
//Components
import Card from '../Card/Card.jsx'
import Modal from '../AddInfo/Modal.jsx'
import ModalContents from '../ModalContent/ModalContents.jsx'
import CardContents from '../CardContent/CardContents.jsx'
import {$authHost} from '../../axios.js'
// Images
import preloadCar from '../../assets/preloadCar.svg'
import spares from '../../assets/spares.png'
import gas from '../../assets/gas.png'
import accessories from '../../assets/accessories.png'
import mileage from '../../assets/mileage.png'
import addIcon from '../../assets/add.png'
import moreIcon from '../../assets/more.png'
import editImage from '../../assets/img.png'
import reload from '../../assets/reload.png'
import send from '../../assets/send.png'
import logout from '../../assets/exit.png'

const UserData = () => {
    const {register, handleSubmit, reset} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)
    const [addImage, setAddImage] = useState(false)
    const [selectedCardType, setSelectedCardType] = useState(null)
    const [selectedCardOpenType, setSelectedCardOpenType] = useState(null)

    const handleCardClick = cardType => {
        setSelectedCardType(cardType)
    }
    const handleCardOpen = cardType => {
        setSelectedCardOpenType(cardType)
    }
    const handleCardClose = () => {
        setSelectedCardOpenType(null)
    }
    const handleModalClose = () => {
        setSelectedCardType(null)
    }
    const handleAddImage = async data => {
        try {
            handleShowAddImage(setAddImage, addImage)
            reset({
                image: '',
            })
            dispatch({
                type: 'ADD_CAR_IMAGE',
                payload: {
                    carImage: data.image,
                },
            })
            await $authHost.patch('/user/update', {
                carImage: data.image,
            })
        } catch (error) {
            console.log(error)
        }
    }
    const handleRemoveImage = async () => {
        try {
            handleShowAddImage(setAddImage, addImage)
            reset({
                image: '',
            })
            dispatch({
                type: 'ADD_CAR_IMAGE',
                payload: {
                    carImage: null,
                },
            })
            await $authHost.patch('/user/update', {
                carImage: null,
            })
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
        console.log('ok')
    }
    const logOut = async () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <>
            <div
                className={
                    selectedCardType ? `${style.home} ${style.opacity}` : `${style.home}`
                }
            >
                <div className={style.home__nav}>
                    {!addImage && (
                        <div className={style.home__image_edit}>
                            <img
                                src={editImage}
                                alt="edit-image"
                                onClick={() => handleShowAddImage(setAddImage, addImage)}
                            />
                        </div>
                    )}
                    <button className={style.home__button} onClick={logOut}>
                        <img src={logout} alt="logout"/>
                    </button>
                </div>
                <div className={style.home__header}>
                    <div className={style.home__image}>
                        <div className={style.home__image_preload}>
                            {user.carImage ? (
                                <img src={user.carImage} alt="userCarImage"/>
                            ) : (
                                <img src={preloadCar} alt="userCarImage"/>
                            )}
                            <div className={style.home__image_preload_reload}>
                                {/*{!addImage && (*/}
                                {/*    <div className={style.home__image_edit}>*/}
                                {/*        <img*/}
                                {/*            src={editImage}*/}
                                {/*            alt="edit-image"*/}
                                {/*            onClick={() => handleShowAddImage(setAddImage, addImage)}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*)}*/}
                                {addImage ? (
                                    <form>
                                        <input {...register('image')} />
                                        <div
                                            className={style.form_icons}
                                            onClick={handleSubmit(handleAddImage)}
                                        >
                                            {' '}
                                            <img src={send} alt="send"/>
                                        </div>
                                        <div className={style.form_icons} onClick={handleRemoveImage}>
                                            {' '}
                                            <img src={reload} alt="reload"/>
                                        </div>
                                    </form>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className={style.home__title}>
                        <ul>
                            <li>Марка: {user.carBrand}</li>
                            <li>Модель: {user.carModel}</li>
                            <li>Год: {user.carYear}</li>
                        </ul>
                    </div>
                </div>
                <div className={style.home__cards}>
                    <Card
                        title="Запчасти"
                        image={spares}
                        bodyContent={
                            <>
                                <div className={style.card__body_title}>Сумма:</div>
                                <div className={style.card__body_sum}>
                                    {user.spares &&
                                        Array.from(user.spares).reduce(
                                            (acc, rec) => acc + rec.price,
                                            0
                                        )}
                                    р.
                                </div>
                            </>
                        }
                        handleClick={() => handleCardClick('spares')}
                        handleCardOpen={() => handleCardOpen('sparesCard')}
                        buttonAdd={addIcon}
                        buttonMore={moreIcon}
                    />
                    <Card
                        title="Бензин"
                        image={gas}
                        bodyContent={
                            <>
                                <div className={style.card__body_title}>Сумма:</div>
                                <div className={style.card__body_sum}>
                                    {user.gas &&
                                        Array.from(user.gas).reduce(
                                            (acc, rec) => acc + rec.price,
                                            0
                                        )}
                                    р.
                                </div>
                            </>
                        }
                        handleCardOpen={() => handleCardOpen('gasolineCard')}
                        handleClick={() => handleCardClick('gasoline')}
                        buttonAdd={addIcon}
                        buttonMore={moreIcon}
                    />
                    <Card
                        title="Пробег"
                        image={mileage}
                        bodyContent={
                            <>
                                <span> {user.carMileage} км </span>
                            </>
                        }
                        showButton={false}
                    />
                    <Card
                        title="Аксессуары"
                        image={accessories}
                        bodyContent={
                            <>
                                <div className={style.card__body_title}>Сумма:</div>
                                <div className={style.card__body_sum}>
                                    {user.accessories &&
                                        Array.from(user.accessories).reduce(
                                            (acc, rec) => acc + rec.price,
                                            0
                                        )}
                                    р.
                                </div>
                            </>
                        }
                        handleCardOpen={() => handleCardOpen('accessoriesCard')}
                        handleClick={() => handleCardClick('accessories')}
                        buttonAdd={addIcon}
                        buttonMore={moreIcon}
                    />
                </div>
            </div>
            {selectedCardType && (
                <Modal
                    onClick={handleModalClose}
                    cardContent={ModalContents[selectedCardType]}
                />
            )}
            {selectedCardOpenType && (
                <Modal
                    onClick={handleCardClose}
                    cardContent={CardContents[selectedCardOpenType]}
                />
            )}
        </>
    )
}

export default UserData
