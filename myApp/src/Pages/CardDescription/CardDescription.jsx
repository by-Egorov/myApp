import { useSpring, animated } from 'react-spring'
import { IoIosArrowDown } from 'react-icons/io'
import style from './CardDescription.module.scss'
const CardDescription = ({cardContent, onClick}) => {
	const animation = useSpring({
		opacity: 1,
		transform: 'translateY(0%)',
		from: { opacity: 0, transform: 'translateY(100%)' },
	})
	return (
		<animated.div style={animation} className='modal'>
			<div className={style.modal__close}>
						<IoIosArrowDown
							size={30}
							onClick={onClick}
						/></div>
			working
			<div className={style.card__content}>{cardContent}</div>
		</animated.div>
	)
}
export default CardDescription
