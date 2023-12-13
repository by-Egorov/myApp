import style from './Modal.module.scss'
import { IoIosArrowDown } from 'react-icons/io'
import { useSpring, animated } from 'react-spring'

const Modal = ({ cardContent, onClick }) => {
	const animation = useSpring({
		opacity: 1,
		transform: 'translateY(0%)',
		from: { opacity: 0, transform: 'translateY(100%)' },
	})
	return (
		<animated.div style={animation} className={style.modal}>
			<div className={style.modal__close}><IoIosArrowDown size={30} onClick={onClick} /></div>

			<div className={style.modal__content}>
				{cardContent}
				<button>Reset</button>
				</div>
		</animated.div>
	)
}

export default Modal
