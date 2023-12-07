import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import authRouter from './routes/authRouter.js'

const PORT = process.env.PORT || 5555
const db = process.env.DB_NAME
const user = process.env.DB_USER_NAME
const password = process.env.DB_PASSWORD
const app = express()

mongoose
	.connect(
		`mongodb+srv://${user}:${password}@cluster0.5qqffmc.mongodb.net/${db}?retryWrites=true&w=majority`
	)
	.then(() => console.log('DB ok'))
	.catch(error => console.log('DB error', error))

app.use(express.json())
app.use(cors())

app.use('/api', authRouter)

app.listen(PORT, error => {
	if (error) {
		return console.warn(error)
	}
	console.log(`Сервер запущен на порту ${PORT}`)
})