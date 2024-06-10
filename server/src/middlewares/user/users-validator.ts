import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import User from '../../model/user.model'

export const addUserValidator = [
  check('username')
    .isLength({ min: 1 })
    .withMessage('Username is required')
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('Username must not contain anything other than alphabet')
    .custom((value) => {
      switch (true) {
        case value.length === 1:
          throw new Error('Username must be at least 2 characters long')
        case value.length > 20:
          throw new Error('Username cannot be more than 20 characters long')
        default:
          return true
      }
    })
    .trim(),
  check('email')
    .isEmail()
    .withMessage('Invalid email address')
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value })
        if (user) {
          throw new Error('There is already an account associated with this email address')
        }
      } catch (err) {
        throw err
      }
    }),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  check('role').default('general')
]

export const addUserValidationHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  const mappedErrors = errors.mapped()

  if (Object.keys(mappedErrors).length === 0) {
    return next()
  }

  res.status(400).json({ errors: Object.values(mappedErrors).map((error) => error.msg) })
}
