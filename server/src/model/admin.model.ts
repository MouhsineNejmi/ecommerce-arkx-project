import { pre, prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { hash, genSalt } from 'bcryptjs'

@pre<Admin>('save', async function (next) {
  const admin = this as Admin

  try {
    const salt = await genSalt(10)
    admin.password = await hash(admin.password, salt)

    next()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error)
  }
})
@modelOptions({ schemaOptions: { timestamps: true } })
export class Admin {
  @prop({ required: true, unique: true, trim: true, minlength: 3, maxlength: 20 })
  username!: string

  static validatePassword(password: string) {
    if (password.length < 6) {
    }
    // Add more complex validation if needed (e.g., regex for special characters)
    return true
  }

  @prop({
    required: true,
    trim: true,
    minlength: 6,
    validate: {
      validator: (password: string) => {
        return password.length < 6
      },
      message: 'Password must be at least 6 characters long!'
    }
  })
  password!: string
}

const AdminModel = getModelForClass(Admin)

export default AdminModel
