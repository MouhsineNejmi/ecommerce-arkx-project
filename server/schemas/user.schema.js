const { object, string } = require('zod');

exports.createUserSchema = object({
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
    role: string({ required_error: 'Role is required' }),
    account_type: string({ required_error: 'Account type is required' }),
  }),
});

exports.loginUserSchema = object({
  body: object({
    username: string({ required_error: 'Username is required' }).min(
      1,
      'Invalid username or password'
    ),
    password: string({ required_error: 'Password is required' }).min(
      8,
      'Invalid username or password'
    ),
  }),
});
