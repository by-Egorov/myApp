import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GiMechanicGarage } from 'react-icons/gi'
import { FaGasPump, FaShopify } from 'react-icons/fa'

import style from './ModalContents.module.scss'

const createAccessoriesContent = () => {
	const AccessoriesContent = () => {
		const {
			register,
			handleSubmit,
			formState: { errors },
		} = useForm()
		return (
			<>
				<div className={style.accessories}>
					<form className={`${style.accessories__form} ${style.form}`}>
						<input
							className={style.input}
							{...register('title', {
								required: true,
							})}
							placeholder='Название'
						/>
						{errors?.email?.type === 'required' && (
							<p className={style.err}>Это поле не может быть пустым</p>
						)}
						<input
							className={style.input}
							{...register('price', {
								required: true,
							})}
							placeholder='Цена'
						/>
						{errors?.email?.type === 'required' && (
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
				</div>
			</>
		)
	}

	return <AccessoriesContent />
}
const createGasolineContent = () => {
	const GasolineContent = () => {
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
						{...register('date', {
							required: true,
						})}
						type='date'
					/>
					{errors?.email?.type === 'required' && (
						<p className={style.err}>Это поле не может быть пустым</p>
					)}
					<input
						className={style.input}
						{...register('price', {
							required: true,
						})}
						placeholder='Цена'
					/>
					{errors?.email?.type === 'required' && (
						<p className={style.err}>Это поле не может быть пустым</p>
					)}
					<div className={style.icon}>
						<FaGasPump size={150} />
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
				<div className={style.gasoline}>
					<form className={`${style.gasoline__form} ${style.form}`}>
						<input
							className={style.input}
							{...register('mileage', {
								required: true,
							})}
							type='number'
							placeholder='Пробег'
						/>
						{errors?.email?.type === 'required' && (
							<p className={style.err}>Это поле не может быть пустым</p>
						)}
						<input
							className={style.input}
							{...register('title', {
								required: true,
							})}
							placeholder='Название'
						/>
						{errors?.email?.type === 'required' && (
							<p className={style.err}>Это поле не может быть пустым</p>
						)}
						<input
							className={style.input}
							{...register('price', {
								required: true,
							})}
							placeholder='Цена'
						/>
						{errors?.email?.type === 'required' && (
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
				</div>
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
