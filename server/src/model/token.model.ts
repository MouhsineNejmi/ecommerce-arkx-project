import { Schema, model } from 'mongoose'

const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 24 * 60 * 60 // 24 hours
  }
})

const Token = model('Token', TokenSchema)

export default Token
