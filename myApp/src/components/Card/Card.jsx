import style from './Card.module.scss'

const Card = ({
	title,
	image,
	bodyContent,
	buttonAdd,
	buttonMore,
	handleClick,
	handleCardOpen,
	showButton = true,
}) => {
	return (
		<div className={style.card}>
			<div className={style.card_title}>
				<span>{title}</span>
				<img src={image} alt='image' />
			</div>
			<div className={style.card__body}>
				<div className={style.card__body_content}>{bodyContent}</div>
			</div>
			<div className={style.card__btn}>
				{showButton && (
					<>
						<div className={style.card__btn_image} onClick={handleClick}>
							<img src={buttonAdd} alt='add' />
						</div>
						<div className={style.card__btn_image} onClick={handleCardOpen}>
							<img src={buttonMore} alt='reload' />
						</div>
					</>
				)}
			</div>
		</div>
	)
}
export default Card
