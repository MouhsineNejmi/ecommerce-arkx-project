const { JWT_SECRET_KEY, JWT_EXPIRES_IN, PORT } = process.env;

export const port = PORT;

export const jwt = {
  secretKey: JWT_SECRET_KEY,
  expiresIn: JWT_EXPIRES_IN,
};
