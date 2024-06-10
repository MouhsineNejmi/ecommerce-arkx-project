import { NextFunction, Request, Response } from 'express'
import { query, validationResult } from 'express-validator'
import nodemailer from 'nodemailer'

import EmailVerification from '../../model/email.model'

import { verifyEmailHTML } from '../../utils/email-template'

import { nodeMailer } from '../../config/config'

export const verifyEmailValidation = [
  query('email').isEmail(),
  query('code').isLength({ min: 5, max: 5 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    return next()
  }
]

interface SendVerificationEmailRequestBody {
  email: string
  username: string
}

export const sendVerificationEmail = async (req: Request, res: Response) => {
  const { email, username } = <SendVerificationEmailRequestBody>req.body

  const verificationCode = Math.floor(10000 + Math.random() * 90000)
  const verificationLink = `${nodeMailer.CLIENT_URL}/auth/verify?code=${verificationCode}&email=${email}`

  try {
    const transporter = nodemailer.createTransport({
      service: nodeMailer.EMAIL_SERVICE,
      auth: {
        user: nodeMailer.USER,
        pass: nodeMailer.PASS
      }
    })

    const info = await transporter.sendMail({
      from: `"Ecommerce Arkx" <${nodeMailer.USER}>`,
      to: email,
      subject: 'Verify your email address',
      html: verifyEmailHTML(username, verificationLink, verificationCode)
    })

    const newVerification = new EmailVerification({
      email,
      verificationCode,
      messageId: info.messageId,
      for: 'signup'
    })

    await newVerification.save()

    return res.status(200).json({
      message: `Verification email was successfully sent to ${email}`
    })
  } catch (error) {
    console.log(error)

    console.log(
      'Could not send verification email. There could be an issue with the provided credentials or the email service.'
    )
    return res.status(500).json({ message: 'Something went wrong' })
  }
}
