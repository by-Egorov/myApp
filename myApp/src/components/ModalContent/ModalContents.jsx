import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
// Images
import spares from '../../assets/spares.png'
import gas from '../../assets/gas.png'
import accessories from '../../assets/accessories.png'

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
				const response = await $authHost.patch('/user/update-data', {
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
						<img src={accessories} alt="accessories" />
					</div>
					<div className={style.button}>
						<button className='button' type='submit'>
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
		const [currentDate, setCurrentDate] = useState(getFormattedDate())
		const dispatch = useDispatch()
		const {
			register,
			handleSubmit,
			reset,
			formState: { errors },
		} = useForm()

		const addDataUser = async (arrayType, date, price) => {
			try {
				const response = await $authHost.patch('/user/update-data', {
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

		function getFormattedDate() {
			const date = new Date()
			const year = date.getFullYear()
			const month = String(date.getMonth() + 1).padStart(2, '0')
			const day = String(date.getDate()).padStart(2, '0')
			return `${year}-${month}-${day}`
		}

		useEffect(() => {
			setCurrentDate(getFormattedDate())
		}, [])

		return (
			<>
				<form className={style.form} onSubmit={handleSubmit(addGas)}>
					<input
						className={style.input}
						{...register('date', {
							required: true,
						})}
						value={currentDate}
						type='date'
						placeholder='Выбрать день'
						onChange={e => setCurrentDate(e.target.value)}
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
					<img src={gas} alt="gas" />
					</div>
					<div className={style.button}>
						<button className='button' type='submit'>
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
		const {
			register,
			handleSubmit,
			reset,
			formState: { errors },
		} = useForm()
		const addDataUser = async (arrayType, mileage, title, price) => {
			try {
				await $authHost.patch('/user/update-data', {
					arrayType,
					mileage,
					title,
					price,
				})
			} catch (error) {
				console.error('Ошибка при добавлении данных на сервер:', error)
			}
		}

		const addSpares = async data => {
			const selectedType = 'spares'
			const selectedMileage = Number(data.mileage)
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

				const updateUser = await $authHost.patch('/user/update', {
					carMileage: data.mileage,
				})
				console.log(updateUser)
				localStorage.setItem('mileage', JSON.stringify(selectedMileage))
				reset(emptyFormData)
			} catch (e) {
				console.warn(e)
			}
		}
		return (
			<>
				<form className={style.form} onSubmit={handleSubmit(addSpares)}>
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
					<img src={spares} alt="spares" />
					</div>
					<div className={style.button}>
						<button className='button' type='submit'>
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
