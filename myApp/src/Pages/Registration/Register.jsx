import style from './Register.module.scss'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import carData from '../../utils/carData.json'
import {
	handleBrandChange,
	handleMileageChange,
	handleModelChange,
	handleYearChange,
} from '../../utils/Handlers/handleChange.js'
import { $host } from '../../axios.js'
import Example from '../../components/Loading/Example.jsx'

const Register = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const [selectedBrand, setSelectedBrand] = useState('')
	const [selectedModel, setSelectedModel] = useState('')
	const [selectedYear, setSelectedYear] = useState('')
	const [selectedMileage, setSelectedMileage] = useState('')
	const [sendMail, setSendMail] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [checkMail, setCheckMail] = useState(false)

	const registration = async data => {
		const { email, password, carYear, carMileage, carModel, carBrand } = data
		try {
			setIsLoading(true)
			dispatch({
				type: 'ADD_USER',
				payload: {
					id: new Date(),
					email: email,
					carBrand: carBrand,
					carModel: carModel,
					carYear: carYear,
					carMileage: carMileage,
					gas: [],
					spares: [],
					accessories: [],
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
			localStorage.setItem('user', JSON.stringify(response.data))
			localStorage.setItem('token', JSON.stringify(response.data.token))
			navigate('/')
			window.location.reload()
		} catch (e) {
			alert(e)
		} finally {
			setIsLoading(false)
		}
	}
	const login = async data => {
		try {
			setIsLoading(true)
			const { email, password } = data
			const response = await $host.post('/user/login', {
				email,
				password,
			})

			if (response) {
				await $host.post('/send-email', {
					email,
				})
				//доработать отправку письма с подтверждением кода
				setSendMail('На вашу почту отправлено письмо с кодом подтверждения')
				setCheckMail(true)
				localStorage.setItem('user', JSON.stringify(response.data))
				localStorage.setItem('token', JSON.stringify(response.data.token))
				// navigate('/')
				// window.location.reload()
			} else {
				console.warn('Ошибка авторизации')
			}
		} catch (e) {
			console.warn(e)
		} finally {
			setIsLoading(false)
		}
	}
	const checked = data => {
		try {
			console.log(data.check)
		} catch (error) {
			console.warn(error)
		}
	}
	return (
		<>
			<div className={style.start}>
				<form
					className={style.start__form}
					onSubmit={
						location.pathname === '/register'
							? handleSubmit(registration)
							: handleSubmit(login)
					}
				>
					<input
						className={style.select}
						{...register('email', {
							required: true,
							pattern:
								/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
						})}
						placeholder='почта'
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
						placeholder='пароль'
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
					<div className={style.succes}>{sendMail}</div>
					{checkMail && (
						<>
							<input
								className={style.select}
								{...register('check', {
									required: true,
								})}
								type='number'
								placeholder='Введите код'
							/>
							{errors?.check?.type === 'required' && (
								<p className={style.err}>Это поле не может быть пустым</p>
							)}
						</>
					)}
					{location.pathname === '/register' && (
						<>
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
						</>
					)}
					{isLoading ? (
						<Example />
					) : (
						<>
							<div className={style.start__button}>
								{checkMail ? <button
									className='button'
									onClick={handleSubmit(checked)}
								>
									Продолжить
								</button>
								:
								<button
									className='button'
									type='submit'
									disabled={
										location.pathname === '/register' && !selectedMileage
									}
								>
									{location.pathname === '/register' ? 'Начать' : 'Войти'}
								</button>}
							</div>
							{location.pathname === '/register' ? (
								<Link to='/login'>
									<button className='button'>Войти</button>
								</Link>
							) : (
								<Link to='/register'>
									<button className='button'>Добавить машину</button>
								</Link>
							)}
						</>
					)}
				</form>
			</div>
		</>
	)
}

export default Register
