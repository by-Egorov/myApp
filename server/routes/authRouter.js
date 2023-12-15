import Router from 'express'
import { check } from 'express-validator'
import {
    login,
    register,
    getUser,
    updateUserData,
    updateUser
} from '../controllers/authController.js'
import authMiddleware from "../middleware/authMiddleware.js";

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
router.get('/user/me',authMiddleware, getUser)
router.patch('/user/update-data', authMiddleware, updateUserData)
router.patch('/user/update', authMiddleware, updateUser)
export default router