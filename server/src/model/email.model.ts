import { prop, getModelForClass } from '@typegoose/typegoose'

export class Email {
  @prop({ required: true, unique: true })
  email!: string

  @prop({ required: true, unique: true })
  verificationCode!: string

  @prop({ required: true })
  messageId!: string

  @prop({ required: true })
  for!: string

  @prop({ default: Date.now, expires: 1800 }) // 1800 seconds = 30 minutes
  createdAt!: Date
}

const EmailModel = getModelForClass(Email)

export default EmailModel
