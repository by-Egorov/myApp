//React
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
//Style
import style from '../../components/UserData/UserData.module.scss'
//Utils
import { handleShowAddImage } from '../../utils/Handlers/handlers.js'
//React-icons
import { IoIosAddCircleOutline, IoMdSpeedometer } from 'react-icons/io'
import { GiMechanicGarage } from 'react-icons/gi'
import { FaShopify } from 'react-icons/fa'
import { PiGasCanFill } from 'react-icons/pi'
import { CiCircleMore, CiImageOn } from 'react-icons/ci'
import { AiOutlineReload, AiOutlineSend } from 'react-icons/ai'
//Icons
import preloadCar from '../../assets/preloadCar.svg'
//Components
import Card from '../Card/Card.jsx'
import Modal from '../AddInfo/Modal.jsx'
import ModalContents from '../ModalContent/ModalContents.jsx'
import CardContents from '../CardContent/CardContents.jsx'
import { $authHost } from '../../axios.js'

const UserData = () => {
	const { register, handleSubmit, reset } = useForm()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(state => state.user.user)
	const [addImage, setAddImage] = useState(false)
	const [selectedCardType, setSelectedCardType] = useState(null)
	const [selectedCardOpenType, setSelectedCardOpenType] = useState(null)
	const [defaultCarImage, setDefaultCarImage] = useState(null)

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
		setDefaultCarImage(null)
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
	}
	const handleRemoveImage = async () => {
		setDefaultCarImage(preloadCar)
		handleShowAddImage(setAddImage, addImage)
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
					<div className={style.home__image_preload}>
						<img
							src={defaultCarImage ? defaultCarImage : user.carImage}
							alt='userCarImage'
						/>
						<div className={style.home__image_preload_reload}>
							{!addImage && (
								<>
									<CiImageOn
										size={20}
										onClick={() => handleShowAddImage(setAddImage, addImage)}
									/>
								</>
							)}
							{addImage ? (
								<form>
									<input {...register('image')} />
									<AiOutlineSend
										size={20}
										onClick={handleSubmit(handleAddImage)}
									/>
									<AiOutlineReload size={20} onClick={handleRemoveImage} />
								</form>
							) : null}
						</div>
					</div>
					{/* ) : (
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
					)} */}
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
				<button className='button' onClick={logOut}>
					Выйти
				</button>
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
