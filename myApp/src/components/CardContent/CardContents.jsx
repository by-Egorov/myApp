import style from './CardContents.module.scss'
import { useSelector } from 'react-redux'
import { GiMechanicGarage } from 'react-icons/gi'
import { FaShopify } from 'react-icons/fa'
import { PiGasCanFill } from 'react-icons/pi'

const createAccessoriesContent = () => {
	const AccessoriesContent = () => {
		return <></>
	}

	return <AccessoriesContent />
}
const createGasolineContent = () => {
	const GasolineContent = () => {
		const user = useSelector(state => state.user.user)
		const dataUser = Array.from(user.gas)
		return (
			<>
				<div className={style.gas}>
					<div className={style.gas__header}>
						<div className={style.gas__header_title}>
							<span>Дата</span>
							<span>Цена</span>
						</div>
					</div>
					<div className={style.gas__info}>
							{dataUser.map((item) => (
								<>
									<div className={style.gas__info_item}><span>{item.date}</span> <span>{item.price} р</span></div>
								</>
							))}
						</div>
					<div className={style.gas__icon}>
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
		return <></>
	}

	return <SparesContent />
}
const CardContents = {
	accessoriesCard: createAccessoriesContent(),
	gasolineCard: createGasolineContent(),
	sparesCard: createSparesContent(),
}

export default CardContents
