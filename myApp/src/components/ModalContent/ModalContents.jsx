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
        const dispatch = useDispatch()
		const {
			register,
			handleSubmit,
			reset,
			formState: { errors },
		} = useForm()

		const addDataUser = async (arrayType, title, price) => {
			try {
				const response = await $authHost.patch('/user/update', {
					arrayType,
					title,
					price,
				})

				console.log(response.data)
			} catch (error) {
				console.error('Ошибка при добавлении данных на сервер:', error)
			}
		}

		const addGas = async data => {
			const selectedType = 'accessories'
			const selectedTitle = data.title
			const selectedPrice = data.price
			try {
				addDataUser(selectedType, selectedTitle, selectedPrice)
				dispatch({
					type: 'ADD_ACCESSORIES',
					payload: {
						title: data.title,
						price: Number(data.price),
					},
				})
				const emptyFormData = {
					title: '',
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
		const {
			register,
			handleSubmit,
			reset,
			formState: { errors },
		} = useForm()

		const addDataUser = async (arrayType, date, price) => {
			try {
				const response = await $authHost.patch('/user/update', {
					arrayType,
					date,
					price,
				})

				console.log(response.data)
			} catch (error) {
				console.error('Ошибка при добавлении данных на сервер:', error)
			}
		}

		const addGas = async data => {
			const selectedType = 'gas'
			const selectedDate = data.date
			const selectedPrice = data.price
			try {
				addDataUser(selectedType, selectedDate, selectedPrice)
				dispatch({
					type: 'ADD_GAS',
					payload: {
						date: data.date,
						price: Number(data.price),
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
						type='number'
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
		const dispatch = useDispatch()
		const user = useSelector(state => state.user.user)
		const {
			register,
			handleSubmit,
			reset,
			formState: { errors },
		} = useForm()
        const addDataUser = async (arrayType, mileage, title, price) => {
            try {
              const response = await $authHost.patch('/user/update', {
                arrayType,
                mileage,
                title,
                price
              });
          
              console.log(response.data);
            } catch (error) {
              console.error('Ошибка при добавлении данных на сервер:', error);
            }
          }

		const addGas = async data => {
			const selectedType = 'spares'
			const selectedMileage = data.mileage
			const selectedTitle = data.title
			const selectedPrice = data.price
			try {
				addDataUser(selectedType, selectedMileage, selectedTitle, selectedPrice)
				dispatch({
					type: 'ADD_SPARES',
					payload: {
						mileage: data.mileage,
						title: data.title,
						price: Number(data.price),
					},
				})
				const emptyFormData = {
					mileage: '',
					title: '',
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
						type='number'
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
