import style from './CardContents.module.scss'
import { useSelector } from 'react-redux'
import { GiMechanicGarage } from 'react-icons/gi'
import { FaShopify } from 'react-icons/fa'
import { PiGasCanFill } from 'react-icons/pi'

const createAccessoriesContent = () => {
	const AccessoriesContent = () => {
		const user = useSelector(state => state.user.user)
		const dataUser = Array.from(user.accessories)
		return (
			<>
				<div className={style.content}>
					<div className={style.content__header}>
						<div className={style.content__header_title}>
							<span>Название</span>
							<span>Цена</span>
						</div>
					</div>
					<div className={style.content__info}>
						{dataUser.length > 0 ? (
							dataUser.map(item => (
								<div className={style.content__info_item} key={item._id}>
									<span>{item.title}</span> <span>{item.price} р</span>
								</div>
							))
						) : (
							<span> Пока пусто</span>
						)}
					</div>
					<div className={style.content__icon}>
						<FaShopify size={300} />
					</div>
				</div>
			</>
		)
	}

	return <AccessoriesContent />
}
const createGasolineContent = () => {
	const GasolineContent = () => {
		const user = useSelector(state => state.user.user)
		const dataUser = Array.from(user.gas)
		return (
			<>
				<div className={style.content}>
					<div className={style.content__header}>
						<div className={style.content__header_title}>
							<span>Дата</span>
							<span>Цена</span>
						</div>
					</div>
					<div className={style.content__info}>
						{dataUser.length > 0 ? (
							dataUser.map(item => {
								const dateObject = new Date(item.date)
								const options = {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								}
								const formattedDate = dateObject.toLocaleDateString(
									'ru-RU',
									options
								)
								return (
									<div className={style.content__info_item} key={item._id}>
										<span>{formattedDate}</span> <span>{item.price} р</span>
									</div>
								)
							})
						) : (
							<div> Пока пусто</div>
						)}
					</div>
					<div className={style.content__icon}>
						<PiGasCanFill size={300} />
					</div>
				</div>
			</>
		)
	}

	return <GasolineContent />
}
const createSparesContent = () => {
	const SparesContent = () => {
		const user = useSelector(state => state.user.user)
		const dataUser = Array.from(user.spares)
		return (
			<>
				<div className={style.content}>
					<div className={style.content__header}>
						<div className={style.content__header_title}>
							<span>Пробег</span>
							<span>Название</span>
							<span>Цена</span>
						</div>
					</div>
					<div className={style.content__info}>
						{dataUser.length > 0 ? (
							dataUser.map(item => (
								<div className={style.content__info_item} key={item._id}>
									<span>{item.mileage}</span> <span>{item.title}</span>{' '}
									<span>{item.price} р</span>
								</div>
							))
						) : (
							<div> Пока пусто</div>
						)}
					</div>
					<div className={style.content__icon}>
						<GiMechanicGarage size={300} />
					</div>
				</div>
			</>
		)
	}

	return <SparesContent />
}
const CardContents = {
	accessoriesCard: createAccessoriesContent(),
	gasolineCard: createGasolineContent(),
	sparesCard: createSparesContent(),
}

export default CardContents
