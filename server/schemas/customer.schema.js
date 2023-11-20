const { object, string } = require('zod');

exports.createCustomerSchema = object({
  body: object({
    first_name: string({ required_error: 'First Name must be a string' }),
    last_name: string({ required_error: 'Last Name must be a string' }),
    username: string({ required_error: 'Username is required' }),
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email'
    ),
    password: string({ required_error: 'Password is required' })
      .min(6, 'Password must be more than 6 characters')
      .max(32, 'Password must be less than 32 characters'),
    account_type: string({ required_error: 'Account type is required' }),
  }),
});
