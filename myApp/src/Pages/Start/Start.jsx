import { useState } from 'react'
import { useDispatch } from 'react-redux'
import carData from '../../utils/carData.json'
import style from './Start.module.scss'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
	handleBrandChange,
	handleMileageChange,
	handleModelChange,
	handleYearChange,
} from '../../utils/Handlers/handleChange.js'
import { $host } from '../../axios.js'

const Start = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const [selectedBrand, setSelectedBrand] = useState('')
	const [userData, setUserData] = useState('')
	const [selectedModel, setSelectedModel] = useState('')
	const [selectedYear, setSelectedYear] = useState('')
	const [selectedMileage, setSelectedMileage] = useState('')

	const registration = async data => {
		const { email, password,  carYear, carMileage, carModel, carBrand } = data
		try {
			dispatch({
				type: 'ADD_CAR',
				payload: {
					id: new Date(),
					email: email,
					carBrand: carBrand,
					carModel: carModel,
					carYear: carYear,
					carMileage: carMileage,
				},
			})

			const response = await $host.post('/user/register', {
				email,
				password,
				carBrand,
				carModel,
				carYear,
				carMileage,
			})

			reset({
				email: '',
				password: '',
				carBrand: '',
				carModel: '',
				carYear: '',
				carMileage: '',
			})
			console.log(response.data)
			setUserData(response.data)
			console.log(userData)
			localStorage.setItem('user', JSON.stringify(response.data))
			navigate('/')
			window.location.reload()
		} catch (e) {
			alert(e)
		}
	}

	return (
		<div className='container'>
			<div className={style.start}>
				<div className={style.start__header}>
					<div className={style.start__title}>
						Добро пожаловать в приложение myCar !
					</div>
					<div className={style.start__title}>
						Введите данные своей машины, и ведите учет расходов
					</div>
				</div>
				<div className={style.start__inputs}>
					<form onSubmit={handleSubmit(registration)}>
						<input
							className={style.select}
							{...register('email', {
								required: true,
								pattern:
									/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
							})}
							placeholder='email'
						/>
						{errors?.email?.type === 'required' && (
							<p className={style.err}>Это поле не может быть пустым</p>
						)}
						{errors?.email?.type === 'pattern' && (
							<p className={style.err}>Введите корректный email</p>
						)}
						<input
							className={style.select}
							{...register('password', {
								required: true,
								minLength: 3,
								maxLength: 8,
							})}
							type='password'
							placeholder='password'
						/>
						{errors?.password?.type === 'required' && (
							<p className={style.err}>Это поле не может быть пустым</p>
						)}
						{errors?.password?.type === 'minLength' && (
							<p className={style.err}>Пароль короче 3 символов</p>
						)}
						{errors?.password?.type === 'maxLength' && (
							<p className={style.err}>Пароль длиннее 8 символов</p>
						)}
						<select
							{...register('carBrand')}
							value={selectedBrand}
							onChange={event =>
								handleBrandChange(event, setSelectedBrand, setSelectedModel)
							}
							className={style.select}
						>
							<option value='' disabled>
								Выберите марку машины
							</option>
							{carData.map(car => (
								<option key={car.id} value={car.id}>
									{car.name}
								</option>
							))}
						</select>

						{selectedBrand && (
							<select
								{...register('carModel')}
								value={selectedModel}
								onChange={event => handleModelChange(event, setSelectedModel)}
								className={style.select}
							>
								<option value='' disabled>
									Выберите модель:
								</option>
								{carData
									.find(car => car.id === selectedBrand)
									.models.map(model => (
										<option key={model.id} value={model.name}>
											{model.name}
										</option>
									))}
							</select>
						)}
						{selectedModel && (
							<select
								{...register('carYear')}
								value={selectedYear}
								onChange={event => handleYearChange(event, setSelectedYear)}
								className={style.select}
							>
								<option value='' disabled>
									Выберите год:
								</option>
								{carData
									.find(car => car.id === selectedBrand)
									.models.map(model => {
										if (model.name === selectedModel) {
											const years = Array.from(
												{ length: model.yearTo - model.yearFrom + 1 },
												(_, index) => model.yearFrom + index
											)
											return years.map(year => (
												<option key={`${model.id}-${year}`} value={year}>
													{year}
												</option>
											))
										}
									})}
							</select>
						)}
						{selectedYear && (
							<input
								{...register('carMileage')}
								value={selectedMileage}
								placeholder='Пробег'
								onChange={event =>
									handleMileageChange(event, setSelectedMileage)
								}
								className={style.select}
							/>
						)}
						<div className={style.start__button}>
							<button
								className={style.start__button_btn}
								type='submit'
								disabled={!selectedMileage}
							>
								Начать
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Start
