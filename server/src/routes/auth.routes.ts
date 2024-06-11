import { Router } from 'express'
import passport from 'passport'

import { addUser, verifyEmail, login, logout, refreshToken } from '../controllers/auth.controller'
import { addUserValidationHandler, addUserValidator } from '../middlewares/user/users-validator'
import { sendVerificationEmail, verifyEmailValidation } from '../middlewares/user/verify-email'

const router = Router()

const requireAuth = passport.authenticate('jwt', { session: false })

router.post('/register', addUserValidator, addUserValidationHandler, addUser, sendVerificationEmail)
router.get('/verify', verifyEmailValidation, verifyEmail)
router.post('/login', login)
router.post('/refresh-token', refreshToken)
router.post('/logout', requireAuth, logout)

export default router
