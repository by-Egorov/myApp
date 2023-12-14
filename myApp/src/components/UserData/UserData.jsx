//React
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
//Style
import style from '../../components/UserData/UserData.module.scss'
//Utils
import {
	handleResetImage,
	handleShowAddImage,
} from '../../utils/Handlers/handlers.js'
//React-icons
import { IoIosAddCircleOutline, IoMdSpeedometer } from 'react-icons/io'
import { GiMechanicGarage } from 'react-icons/gi'
import { FaShopify } from 'react-icons/fa'
import { PiGasCanFill } from 'react-icons/pi'
import { CiCircleMore } from 'react-icons/ci'
//Icons
import preloadCar from '../../assets/preloadCar.svg'
//Components
import Card from '../Card/Card.jsx'
import Modal from '../AddInfo/Modal.jsx'
import ModalContents from '../ModalContent/ModalContents.jsx'
import CardContents from '../CardContent/CardContents.jsx'

const UserData = () => {
	const { register, handleSubmit } = useForm()

	const navigate = useNavigate()
	const user = useSelector(state => state.user.user)
	const [addImage, setAddImage] = useState(false)
	const [selectedCardType, setSelectedCardType] = useState(null)
	const [selectedCardOpenType, setSelectedCardOpenType] = useState(null)
	const [userCarImage, setUserCarImage] = useState(
		JSON.parse(localStorage.getItem('userCarImage')) || null
	)
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
	const handleAddImage = data => {
		console.log(data.image)
		setUserCarImage(data.image)
		localStorage.setItem('userCarImage', JSON.stringify(data.image))
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
				<div className={style.home__title}>
					<ul>
						<li>{user.carBrand}</li>
						<li>{user.carModel}</li>
						<li>{user.carYear} год</li>
					</ul>
				</div>
				<div className={style.home__image}>
					{userCarImage ? (
						<div
							className={style.home__image_preload}
							onClick={() => handleShowAddImage(setAddImage)}
						>
							<img src={userCarImage} alt='userCarImage' />
							<button onClick={() => handleResetImage(setUserCarImage)}>
								сбросить
							</button>
						</div>
					) : (
						<div className={style.home__image_preload}>
							<div className={style.home__image_preload_img}>
								<img src={preloadCar} alt='preload' />
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
											<button type='submit'>отправить</button>
										</form>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
				<div className={style.home__cards}>
					<Card
						title='Запчасти'
						icon={<GiMechanicGarage size={50} />}
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
						buttonAdd={<IoIosAddCircleOutline size={30} />}
						buttonMore={<CiCircleMore size={30} />}
					/>
					<Card
						title='Бензин'
						icon={<PiGasCanFill size={50} />}
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
						buttonAdd={<IoIosAddCircleOutline size={30} />}
                        buttonMore={<CiCircleMore size={30} />}
					/>
					<Card
						title='Пробег'
						icon={<IoMdSpeedometer size={50} />}
						bodyContent={
							<>
								<span> {user.carMileage} км </span>
							</>
						}
					/>
					<Card
						title='Аксессуары'
						icon={<FaShopify size={50} />}
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
						buttonAdd={<IoIosAddCircleOutline size={30} />}
                        buttonMore={<CiCircleMore size={30} />}
					/>
				</div>
				<button onClick={logOut}>Выйти</button>
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
