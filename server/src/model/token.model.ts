import { getModelForClass, prop, Ref } from '@typegoose/typegoose'

import { User } from './user.model'

export class Token {
  @prop({ type: () => [User], default: [], required: true })
  user!: Ref<User>

  @prop({ required: true })
  refreshToken!: string

  @prop({ required: true })
  accessToken!: string

  @prop({ default: Date.now, expires: 24 * 60 * 60 })
  createdAt!: string
}

const TokenModel = getModelForClass(Token)

export default TokenModel
