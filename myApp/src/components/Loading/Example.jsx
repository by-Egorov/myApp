import ReactLoading from 'react-loading'
import style from './Example.module.scss'

const Example = () => (
	<ReactLoading
		type={'spinningBubbles'}
		color='black'
		width={40}
		height={40}
		className={style.loading}
	/>
)

export default Example
