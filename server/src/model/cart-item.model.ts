import { prop, Ref, getModelForClass } from '@typegoose/typegoose'

import { Product } from './product.model'
import { Cart } from './cart.model'

export class CartItem {
  @prop({ required: true })
  quantity!: number

  @prop({ ref: () => Product })
  product!: number

  @prop({ ref: () => Cart })
  cart!: Ref<Cart>
}

const CartItemModel = getModelForClass(CartItem)

export default CartItemModel
