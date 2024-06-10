import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 5000

export const MONGO_USER = process.env.MONGO_USER || ''
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''

export const mongo = {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_URL: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.vvuodb5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
}
