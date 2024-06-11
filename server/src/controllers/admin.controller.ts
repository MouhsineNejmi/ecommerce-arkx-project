import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import Admin from '../models/admin.model'
import AdminToken from '../models/admin-token.model'
import User from '../models/user.model'

import { token } from '../config/config'

interface AdminLoginRequestBody {
  username: string
  password: string
}

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = <AdminLoginRequestBody>req.body
    const existingUser = await Admin.findOne({
      username
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
      username: existingUser.username
    }

    const accessToken = jwt.sign(payload, token.SECRET, {
      expiresIn: '6h'
    })

    const newAdminToken = new AdminToken({
      user: existingUser._id,
      accessToken
    })

    await newAdminToken.save()

    return res.status(200).json({
      accessToken,
      accessTokenUpdatedAt: new Date().toLocaleString(),
      user: {
        _id: existingUser._id,
        username: existingUser.username
      }
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ message: 'Internal Server error. Please try again later.' })
  }
}

export const getModerators = async (req: Request, res: Response) => {
  try {
    const moderators = await User.find({ role: 'moderator' }).select('_id name email')
    return res.status(200).json(moderators)
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving moderators' })
  }
}

export const getSellers = async (req: Request, res: Response) => {
  try {
    const sellers = await User.find({ role: 'seller' }).select('_id name email')
    return res.status(200).json(sellers)
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving sellers' })
  }
}
