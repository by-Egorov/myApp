import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import User from '../models/User.js'

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
		const { passwordHash, ...userData } = user._doc
		res.json({
			...userData,
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
		const user = await User.findById(req.user.id)
		return res.json({ user })
	} catch (e) {
		console.log(e)
		res.status(400).json({
			message: 'Get Users error',
		})
	}
}
//Update
export const updUser = async (req, res) => {
    const userId = req.user.id
	const update = req.body
	try {
		//Поиск пользователя по I'd
		const user = await User.findByIdAndUpdate(userId, update, {
            new: true
        })
		console.log(update) // Возвращает userId и поле update
        console.log(userId) // undefined
		console.log(user) // null
		res.json(user)
	} catch (error) {
		console.error('Ошибка при обновлении данных пользователя:', error)
		res.status(500).json({ error: 'Ошибка при обновлении данных пользователя' })
	}
}
