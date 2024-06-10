import { prop, Ref, getModelForClass } from '@typegoose/typegoose'

import { Store } from './store.model'

export class OrderItem {
  @prop({ required: true })
  address!: string

  @prop({ required: true })
  amount!: number

  @prop({ required: true })
  phone!: string

  @prop({ enum: ['fulffiled', 'rejected', 'refunded', 'pending'], default: 'pending', required: true })
  status!: string

  @prop({ ref: () => Store })
  store!: Ref<Store>

  @prop({ type: () => [OrderItem] })
  order_items!: Ref<OrderItem>[]
}

const OrderItemModel = getModelForClass(OrderItem)

export default OrderItemModel
