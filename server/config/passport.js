const LocalStrategy = require('passport-local').Strategy;
const verifyPassword = require('../helpers/verifyPassword');
const User = require('../models/user.model');
const Customer = require('../models/customer.model');
const Seller = require('../models/seller.model');

module.exports = (passport) => {
  passport.use(
    'local',
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, done) => {
        const { accountType } = req.body;
        let user, seller, customer;
        let isMatched;

        if (accountType === 'user') {
          user = await User.findOne({ username });
          isMatched = user && (await verifyPassword(user.password, password));
        } else if (accountType === 'seller') {
          seller = await Seller.findOne({ username });
          isMatched =
            seller && (await verifyPassword(seller.password, password));
        } else {
          customer = await Customer.findOne({ username });
          isMatched =
            customer && (await verifyPassword(customer.password, password));
        }

        if (accountType === 'user' && !user) {
          console.log('Incorrect username or password');
          return done(null, false, {
            message: 'Incorrect username or password.',
          });
        }

        if (accountType === 'customer' && !customer) {
          console.log('Incorrect username or password');
          return done(null, false, {
            message: 'Incorrect username or password.',
          });
        }

        if (accountType === 'seller' && !seller) {
          console.log('Incorrect email or password');
          return done(null, false, {
            message: 'Incorrect email or password.',
          });
        }

        if (isMatched) {
          console.log('Invalid password');

          return done(null, false, {
            message: 'Invalid password.',
          });
        }

        if (
          (accountType === 'user' && !user.active) ||
          (accountType === 'customer' && !customer.active) ||
          (accountType === 'seller' && !seller.active)
        ) {
          return done(null, false, {
            message: "The account you're trying to access is deactivated",
          });
        }

        if (accountType === 'customer') {
          return done(null, customer);
        } else if (accountType === 'seller') {
          return done(null, seller);
        }
        return done(null, user);
      }
    )
  );
};
