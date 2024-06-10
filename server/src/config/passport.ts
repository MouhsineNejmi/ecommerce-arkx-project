import passport from 'passport'
// import jwt from 'jsonwebtoken'
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'

// import User from '../model/user.model'
// import Token from '../model/token.model'

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
}

passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      // const user = User.findOne({ email: jwt_payload.email })
      // if (user) {
      // const refreshTokenFromDB = await Token.findOne({ user: user._id })
      // }
    } catch (error) {
      return done(error, false)
    }
  })
)
