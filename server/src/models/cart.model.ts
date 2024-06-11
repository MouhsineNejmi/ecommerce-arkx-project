import { prop, Ref, getModelForClass } from '@typegoose/typegoose'

import { Product } from './product.model'
import { User } from './user.model'

export class Cart {
  @prop({ required: true })
  address!: string

  @prop({ required: true })
  price!: number

  @prop({ ref: () => User })
  user?: Ref<User>

  @prop({ type: () => [Product] })
  cart_item!: Ref<Product>[]
}

const CartModel = getModelForClass(Cart)

export default CartModel
