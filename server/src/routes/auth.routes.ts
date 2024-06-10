import { Router } from 'express'

import { addUser, verifyEmail } from '../controllers/auth.controller'

import { addUserValidationHandler, addUserValidator } from '../middlewares/user/users-validator'
import { sendVerificationEmail, verifyEmailValidation } from '../middlewares/user/verify-email'

const router = Router()

router.post('/register', addUserValidator, addUserValidationHandler, addUser, sendVerificationEmail)
router.get('/verify', verifyEmailValidation, verifyEmail)

export default router
