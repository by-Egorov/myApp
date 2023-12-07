import Router from 'express'
import { check } from 'express-validator'
import {
    login,
    register,
} from '../controllers/authController.js'

const router = new Router()
router.post(
    '/user/register',
    [
        check('email', 'Поле email не может быть пустым').notEmpty(),
        check(
            'password',
            'Пароль должен быть больше 4 и меньше 10 символов'
        ).isLength({ min: 4, max: 10 }),
    ],
    register
)
router.post(
    '/user/login',
    [
        check('email', 'Поле email не может быть пустым').notEmpty(),
        check(
            'password',
            'Пароль должен быть больше 4 и меньше 10 символов'
        ).isLength({ min: 4, max: 10 }),
    ],
    login
)

export default router