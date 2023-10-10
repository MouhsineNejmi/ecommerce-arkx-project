const LocalStrategy = require('passport-local').Strategy;
const verifyPassword = require('../helpers/verifyPassword');
const Customer = require('../models/customer.model');

const passportLocalStrategy = new LocalStrategy(
  async (username, password, done) => {
    const customer = await Customer.findOne({ username: username });

    if (!customer) {
      return done(null, false);
    }

    if (verifyPassword(password, customer.password)) {
      return done(null, false);
    }

    return done(null, customer);
  }
);

module.exports = passportMiddleware = (passport) =>
  passport.use(passportLocalStrategy);
