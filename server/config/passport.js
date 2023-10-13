const LocalStrategy = require('passport-local').Strategy;
const verifyPassword = require('../helpers/verifyPassword');
const User = require('../models/user.model');

module.exports = (passport) => {
  passport.serializeUser(async (id, done) => {
    const user = await User.findById(id);
    return done(null, user);
  });

  passport.deserializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.use(
    'local',
    new LocalStrategy(
      { usernameField: 'email' },
      async (username, password, done) => {
        const user = await User.findOne({ email: username });

        if (!user) {
          console.log('Incorrect username or password');
          return done(null, false, {
            message: 'Incorrect username or password.',
          });
        }

        const isMatched = await verifyPassword(user.password, password);
        if (isMatched) {
          console.log(password, user.password);
          console.log('Invalid password');

          return done(null, false, {
            message: 'Invalid password.',
          });
        }

        if (!user.active) {
          return done(null, false, {
            message: "The account you're trying to access is deactivated",
          });
        }

        return done(null, user);
      }
    )
  );
};
