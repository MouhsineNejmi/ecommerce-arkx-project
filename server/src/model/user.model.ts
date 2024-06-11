import { prop, modelOptions, getModelForClass, Ref } from '@typegoose/typegoose'

import { Product } from './product.model'
import { Order } from './order.model'

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @prop({ required: true, unique: true })
  username!: string

  @prop({ required: true, unique: true })
  email!: string

  @prop({ default: '/* TO DO */' })
  avatar?: string

  @prop({ required: true })
  password!: string

  @prop({ enum: ['general', 'seller', 'admin', 'moderator'], default: 'general' })
  role!: string

  @prop({ default: false })
  isEmailVerified!: boolean

  @prop({ ref: () => Product, default: [] })
  favoriteProducts!: Ref<Product>[]

  @prop({ type: () => [Order], default: [] })
  orders?: Ref<Order>[]
}

const UserModel = getModelForClass(User)

export default UserModel
