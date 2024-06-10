// const LOG_TYPE = {
// }

import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'

import User from '../model/user.model'
import EmailVerification from '../model/email.model'

/**
 * Adds a new user to the database with the given name, email, password, and avatar.
 *
 * @description If the email domain of the user's email is "mod.ecom-arkx.com", the user will be
 * assigned the role of "moderator" by default, but not necessarily as a moderator of any store.
 * Otherwise, the user will be assigned the role of "general" user.
 *
 */

interface AddUserRequestBody {
  username: string
  email: string
  password: string
}

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = <AddUserRequestBody>req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  const defaultAvatar = 'https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg'

  const emailDomain = email.split('@')[1]
  const userRole = emailDomain === 'mod.ecom-arkx.com' ? 'moderator' : 'general'

  try {
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: userRole,
      avatar: defaultAvatar
    })

    await newUser.save()

    return next()
  } catch (error) {
    return res.status(400).json({
      message: 'Failed to add user'
    })
  }
}

export const verifyEmail = async (req: Request, res: Response) => {
  const { code, email } = req.query

  try {
    const [isVerified, verification] = await Promise.all([
      User.findOne({ email, isEmailVerified: true }),
      EmailVerification.findOne({
        email,
        verificationCode: code
      })
    ])

    if (isVerified) {
      return res.status(400).json({ message: 'Email is already verified' })
    }

    if (!verification) {
      return res.status(400).json({ message: 'Verification code is invalid or has expired' })
    }

    await Promise.all([
      User.findOneAndUpdate({ email: { $eq: email } }, { isEmailVerified: true }, { new: true }).exec(),
      EmailVerification.deleteMany({ email: { $eq: email } }).exec()
    ])

    return res.status(200).json({ message: 'Your email is verified successfully!' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}
