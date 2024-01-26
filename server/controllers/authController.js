import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import User from '../models/User.js'
import nodemailer from 'nodemailer'

const email = process.env.EMAIL
const pass = process.env.PASS

const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 587,
  secure: false,
  auth: {
    user: email,
    pass: pass
  }
})

//Random number
const getRandomNumber = (min, max) => {
	return Math.round(Math.random() * (max - min) + min)
}
//Generate jwt token
const generateAccessToken = id => {
	const payload = {
		id,
	}
	return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' })
}

//Register
export const register = async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: 'Ошибка при регистрации', errors })
		}
		const password = req.body.password

		const salt = await bcrypt.genSalt(7)
		const hash = await bcrypt.hash(password, salt)

		const doc = new User({
			email: req.body.email,
			passwordHash: hash,
			carBrand: req.body.carBrand,
			carMileage: req.body.carMileage,
			carModel: req.body.carModel,
			carYear: req.body.carYear,
		})
		const user = await doc.save()
		const token = generateAccessToken(user._id)
		const { passwordHash, ...userData } = user._doc
		res.json({
			...userData,
			token,
		})
	} catch (e) {
		console.log(e)
		res.status(400).json({
			message: 'Registration error',
		})
	}
}

//Login
export const login = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email })
		if (!user) {
			return res
				.status(400)
				.json({ message: 'Пользователь с таким email не найден' })
		}
		if (user.email !== req.body.email) {
			return res
				.status(409)
				.json({ message: 'Не верные данные, повторите ввод' })
		}
		const isValidPass = await bcrypt.compare(
			req.body.password,
			user._doc.passwordHash
		)
		if (!isValidPass) {
			return res.status(401).json({ message: 'Введен неверный пароль' })
		}
		const token = generateAccessToken(user._id)
		const { passwordHash, ...userData } = user._doc
		res.json({
			...userData,
			token,
		})
		// return res.json({ token })
	} catch (e) {
		console.log(e)
		res.status(400).json({
			message: 'Login error',
		})
	}
}
// Get User
export const getUser = async (req, res) => {
	try {
		if (req.user && req.user.id) {
			const userId = req.user.id
			const user = await User.findById(userId)
			return res.json(user)
		} else {
			res.status(401).json({ error: 'Пользователь не авторизован' })
		}
	} catch (e) {
		console.log(e)
		res.status(400).json({
			message: 'Get Users error',
		})
	}
}
//Update
export const updateUserData = async (req, res) => {
	const userId = req.user.id
	const { arrayType, date, price, title, mileage, carMileage } = req.body
	try {
		let updateObject = {}

		switch (arrayType) {
			case 'gas':
				updateObject = { $addToSet: { gas: { date, price } } }
				break
			case 'accessories':
				updateObject = { $addToSet: { accessories: { title, price } } }
				break
			case 'spares':
				updateObject = { $addToSet: { spares: { mileage, title, price } } }
				break
			default:
				return res.status(400).json({ error: 'Некорректный тип массива' })
		}
		const user = await User.findByIdAndUpdate(userId, updateObject, {
			new: true,
		})

		res.json(user)
	} catch (error) {
		console.error('Ошибка при обновлении данных пользователя:', error)
		res.status(500).json({ error: 'Ошибка при обновлении данных пользователя' })
	}
}
export const updateUser = async (req, res) => {
	const userId = req.user.id
	const update = req.body
	try {
		const user = await User.findByIdAndUpdate(userId, update, {
			new: true,
		})
		console.log(update)
		console.log(user)
	} catch (error) {
		console.log(error)
	}
}
//send-email
export const sendMail = async (req, res) => {
	const randomNumber = getRandomNumber(1000, 9999)
	try {
		await transporter.sendMail({
			from: process.env.EMAIL, // Адрес отправителя
			to: req.body.email, // Адрес получателя
			subject: `Приветствую`,
			html: `
			<p>Вы пытаетесь авторизоваться в приложении myCar!</p>
			<p>Ваш код подтверждения: ${randomNumber}</p>`,
		})

		res.status(200).json({ message: 'Email sent successfully' })
	} catch (error) {
		console.error(error)
		res.status(500).send(error.message)
	}
}
