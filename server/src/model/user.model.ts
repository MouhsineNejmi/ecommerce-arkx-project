import { prop, modelOptions, getModelForClass, Ref } from '@typegoose/typegoose'

import { Product } from './product.model'
import { Cart } from './cart.model'
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

  @prop({ enum: ['general', 'seller', 'admin'], default: 'general' })
  role!: string

  @prop({ default: false })
  isEmailVerified!: boolean

  @prop({ ref: () => Product, default: [] })
  favoriteProducts!: Ref<Product>[]

  @prop({ ref: () => Cart })
  cart?: Ref<Cart>

  @prop({ type: () => [Order], default: [] })
  orders?: Ref<Order>[]
}

const UserModel = getModelForClass(User)

export default UserModel
