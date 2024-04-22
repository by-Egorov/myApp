import style from './CardContents.module.scss'
import { useSelector } from 'react-redux'
// Images
import spares from '../../assets/spares.png'
import gas from '../../assets/gas.png'
import accessories from '../../assets/accessories.png'

const createAccessoriesContent = () => {
	const AccessoriesContent = () => {
		const user = useSelector(state => state.user.user)
		const dataUser = Array.from(user.accessories)
		return (
			<>
				<div className={style.content}>
					<div className={style.content__header}>
						<div className={style.content__header_title}>
							<div>Название</div>
							<div>Цена</div>
						</div>
					</div>
					<div className={style.content__info}>
						{dataUser.length > 0 ? (
							dataUser.map(item => (
								<div className={style.content__info_item} key={item._id}>
									<div>{item.title}</div>{' '}
									<div className={style.content__info_item_price}>
										{item.price} р
									</div>
								</div>
							))
						) : (
							<div className={style.content__info_null}> Пока пусто</div>
						)}
					</div>
					<div className={style.content__icon}>
						<img src={accessories} alt='accessories' />
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
							<div>Дата</div>
							<div>Цена</div>
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
										<div>{formattedDate}</div>{' '}
										<div className={style.content__info_item_price}>
											{item.price} р
										</div>
									</div>
								)
							})
						) : (
							<div className={style.content__info_null}> Пока пусто</div>
						)}
					</div>
				</div>
					<div className={style.content__icon}>
						<img src={gas} alt='gas' />
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
							<div>Пробег</div>
							<div>Название</div>
							<div>Цена</div>
						</div>
					</div>
					<div className={style.content__info}>
						{dataUser.length > 0 ? (
							dataUser.map(item => (
								<div className={style.content__info_item} key={item._id}>
									<div>{item.mileage}</div>
									<div>{item.title}</div>
									<div className={style.content__info_item_price}>
										{item.price}
									</div>
								</div>
							))
						) : (
							<div className={style.content__info_null}> Пока пусто</div>
						)}
					</div>
				</div>
					<div className={style.content__icon}>
						<img src={spares} alt='spares' />
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
