import style from './Modal.module.scss'
import { IoIosArrowDown } from 'react-icons/io'
import { useSpring, animated } from 'react-spring'
import arrowDown from '../../assets/arrow-down.png'
const Modal = ({ cardContent, onClick }) => {
	const animation = useSpring({
		opacity: 1,
		transform: 'translateY(0%)',
		from: { opacity: 0, transform: 'translateY(100%)' },
	})
	return (
		<animated.div style={animation} className={style.modal}>
			<div className={style.modal__content}>
				<div className={style.modal__close} onClick={onClick}>
					<img src={arrowDown} alt='arrowDown' />
				</div>
				{cardContent}
			</div>
		</animated.div>
	)
}

export default Modal
