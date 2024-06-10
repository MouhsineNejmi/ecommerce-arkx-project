import express, { Express } from 'express'
import { ConnectOptions } from 'mongoose'
import cors from 'cors'

import { PORT, mongo } from 'config/config'
import Database from 'config/database'

const app: Express = express()

const db = new Database(mongo.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as ConnectOptions)

db.connect().catch((err) => console.error('Error connecting to database:', err))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(passport.initialize());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
