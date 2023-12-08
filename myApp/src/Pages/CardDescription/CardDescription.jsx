import style from './CardDescription.module.scss'
const CardDescription = ({ cardContent }) => {
	return (
		<div className={style.card}>
			<div className={style.card__content}>{cardContent}</div>
		</div>
	)
}
export default CardDescription
