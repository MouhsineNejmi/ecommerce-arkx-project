// const LOG_TYPE = {
// }

import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../model/user.model'
import EmailVerification from '../model/email.model'
import Token from '../model/token.model'

import { token } from '../config/config'

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

interface LoginBodyRequest {
  email: string
  password: string
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = <LoginBodyRequest>req.body
    const existingUser = await User.findOne({
      email
    })

    if (!existingUser) {
      return res.status(404).json({
        message: "User with these credentials doesn't exists"
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: 'Invalid password'
      })
    }

    const payload = {
      id: existingUser._id,
      email: existingUser.email
    }

    const accessToken = jwt.sign(payload, token.SECRET, {
      expiresIn: '6h'
    })

    const refreshToken = jwt.sign(payload, token.REFRESH_SECRET, {
      expiresIn: '7d'
    })

    const newRefreshToken = new Token({
      user: existingUser._id,
      refreshToken,
      accessToken
    })

    await newRefreshToken.save()

    return res.status(200).json({
      accessToken,
      refreshToken,
      accessTokenUpdatedAt: new Date().toLocaleString(),
      user: {
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role,
        avatar: existingUser.avatar
      }
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server error. Please try again later.' })
  }
}

interface RefreshTokenRequestBody {
  refreshToken: string
}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = <RefreshTokenRequestBody>req.body

    const existingToken = await Token.findOne({
      refreshToken
    })

    if (!existingToken) {
      return res.status(401).json({
        message: 'Invalid refresh token'
      })
    }

    const existingUser = await User.findById(existingToken.user)
    if (!existingUser) {
      return res.status(401).json({
        message: 'Invalid refresh token'
      })
    }

    const decodedRefreshToken = jwt.decode(existingToken.refreshToken)
    if (!decodedRefreshToken) {
      return res.status(401).json({
        message: 'Invalid refresh token'
      })
    }

    const refreshTokenExpiresAt = (decodedRefreshToken as { exp: number }).exp * 1000
    if (Date.now() >= refreshTokenExpiresAt) {
      await existingToken.deleteOne()
      return res.status(401).json({
        message: 'Expired refresh token'
      })
    }

    const payload = {
      id: existingUser._id,
      email: existingUser.email
    }

    const accessToken = jwt.sign(payload, token.SECRET, {
      expiresIn: '6h'
    })

    return res.status(200).json({
      accessToken,
      refreshToken: existingToken.refreshToken,
      accessTokenUpdatedAt: new Date().toLocaleString()
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1] ?? null
    if (accessToken) {
      await Token.deleteOne({ accessToken })
    }

    return res.status(200).json({
      message: 'Logout successful'
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error. Please try again later.'
    })
  }
}
