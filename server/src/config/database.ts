import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

export default class Database {
  public uri: string
  public options: mongoose.ConnectOptions

  constructor(uri: string, options?: mongoose.ConnectOptions) {
    this.uri = uri
    this.options = options || {}
  }

  async connect() {
    try {
      await mongoose.connect(this.uri, this.options)
      console.log(`Connected to database: ${mongoose.connection.db.databaseName}`)
    } catch (error) {
      throw error
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect()
      console.log(`Disconnected from database: ${mongoose.connection.db.databaseName}`)
    } catch (error) {
      throw error
    }
  }
}
