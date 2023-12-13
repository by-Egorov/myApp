import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { GiMechanicGarage } from 'react-icons/gi'
import { FaShopify } from 'react-icons/fa'
import { PiGasCanFill } from 'react-icons/pi'

import style from './ModalContents.module.scss'
import { $authHost } from '../../axios.js'

const createAccessoriesContent = () => {
	const AccessoriesContent = () => {
		const {
			register,
			handleSubmit,
			formState: { errors },
		} = useForm()
		return (
			<>
				<form className={style.form}>
					<input
						className={style.input}
						{...register('title', {
							required: true,
						})}
						placeholder='Название'
					/>
					{errors?.title?.type === 'required' && (
						<p className={style.err}>Это поле не может быть пустым</p>
					)}
					<input
						className={style.input}
						{...register('price', {
							required: true,
						})}
						placeholder='Цена'
					/>
					{errors?.price?.type === 'required' && (
						<p className={style.err}>Это поле не может быть пустым</p>
					)}
					<div className={style.icon}>
						<FaShopify size={150} />
					</div>
					<div className={style.button}>
						<button className={style.button_btn} type='submit'>
							Добавить
						</button>
					</div>
				</form>
			</>
		)
	}

	return <AccessoriesContent />
}
const createGasolineContent = () => {
	const GasolineContent = () => {
		const dispatch = useDispatch()
		const user = useSelector(state => state.user.user)
		const {
			register,
			handleSubmit,
			reset,
			formState: { errors },
		} = useForm()

		const addGas = async data => {
			try {
				dispatch({
					type: 'ADD_GAS',
					payload: {
						date: data.date,
						price: data.price,
					},
				})
				await $authHost.put(`/user/update`, {
					userId: user._id,
					update: {
						gas: {
							date: data.date,
							price: data.price,
						},
					},
				})
				const emptyFormData = {
					date: '',
					price: '',
				}
				reset(emptyFormData)
			} catch (e) {
				console.warn(e)
			}
		}

		return (
			<>
				<form className={style.form} onSubmit={handleSubmit(addGas)}>
					<input
						className={style.input}
						{...register('date', {
							required: true,
						})}
						type='date'
					/>
					{errors?.date?.type === 'required' && (
						<p className={style.err}>Это поле не может быть пустым</p>
					)}
					<input
						className={style.input}
						{...register('price', {
							required: true,
						})}
						placeholder='Цена'
					/>
					{errors?.price?.type === 'required' && (
						<p className={style.err}>Это поле не может быть пустым</p>
					)}
					<div className={style.icon}>
						<PiGasCanFill size={150} />
					</div>
					<div className={style.button}>
						<button className={style.button_btn} type='submit'>
							Добавить
						</button>
					</div>
				</form>
			</>
		)
	}

	return <GasolineContent />
}
const createSparesContent = () => {
	const SparesContent = () => {
		const {
			register,
			handleSubmit,
			formState: { errors },
		} = useForm()
		return (
			<>
				<form className={style.form}>
					<input
						className={style.input}
						{...register('mileage', {
							required: true,
						})}
						type='number'
						placeholder='Пробег'
					/>
					{errors?.mileage?.type === 'required' && (
						<p className={style.err}>Это поле не может быть пустым</p>
					)}
					<input
						className={style.input}
						{...register('title', {
							required: true,
						})}
						placeholder='Название'
					/>
					{errors?.title?.type === 'required' && (
						<p className={style.err}>Это поле не может быть пустым</p>
					)}
					<input
						className={style.input}
						{...register('price', {
							required: true,
						})}
						placeholder='Цена'
					/>
					{errors?.price?.type === 'required' && (
						<p className={style.err}>Это поле не может быть пустым</p>
					)}
					<div className={style.icon}>
						<GiMechanicGarage size={150} />
					</div>
					<div className={style.button}>
						<button className={style.button_btn} type='submit'>
							Добавить
						</button>
					</div>
				</form>
			</>
		)
	}

	return <SparesContent />
}
const ModalContents = {
	accessories: createAccessoriesContent(),
	gasoline: createGasolineContent(),
	spares: createSparesContent(),
}

export default ModalContents
