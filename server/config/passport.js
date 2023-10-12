const LocalStrategy = require('passport-local').Strategy;
const verifyPassword = require('../helpers/verifyPassword');
const Customer = require('../models/customer.model');

module.exports = (passport) => {
  passport.serializeUser(async (id, done) => {
    const user = await Customer.findById(id);
    return done(null, user);
  });

  passport.deserializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.use(
    'customer-local',
    new LocalStrategy(async (username, password, done) => {
      const customer = await Customer.findOne({ username: username });

      if (!customer) {
        return done(null, false);
      }

      if (verifyPassword(password, customer.password)) {
        return done(null, false);
      }

      return done(null, customer);
    })
  );
};
