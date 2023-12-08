import style from './Card.module.scss'

const Card = ({ title, icon, bodyContent, button, handleClick }) => {
	
	return (
		<div className={style.card}>
			<div className={style.card_title}>
				<span>{title}</span>
				{icon}
			</div>
			<div className={style.card__body}>
				<div className={style.card__body_content}>
					{bodyContent}
				</div>
			</div>
			<div className={style.card__btn} onClick={handleClick}>
				{button}
			</div>
		</div>
	)
}
export default Card
