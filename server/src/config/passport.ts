import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'

import User from '../model/user.model'
import Token from '../model/token.model'

import { token } from './config'

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
}

interface JwtPayload {
  _id: string
  email: string
  exp: number
}

passport.use(
  new Strategy(opts, async (jwt_payload: JwtPayload, done) => {
    try {
      const user = User.findOne({ email: jwt_payload.email })

      if (user) {
        const refreshTokenFromDB = await Token.findOne({ user: user._id })

        if (!refreshTokenFromDB) {
          return done(null, false)
        }

        const refreshPayload = jwt.verify(refreshTokenFromDB.refreshToken, token.REFRESH_SECRET) as JwtPayload

        if (refreshPayload?.email !== jwt_payload?.email) {
          return done(null, false)
        }

        const tokenExpiration = new Date(jwt_payload?.exp * 1000)
        const now = new Date()
        const timeDifference = tokenExpiration.getTime() - now.getTime()

        if (timeDifference > 0 && timeDifference < 30 * 60 * 1000) {
          const newPayload = {
            _id: user._id,
            email: user.email
          }
          const newToken = jwt.sign(newPayload, token.SECRET as string, { expiresIn: '6h' })

          return done(null, { user, newToken })
        }

        return done(null, { user })
      } else {
        return done(null, false)
      }
    } catch (error) {
      return done(error, false)
    }
  })
)
