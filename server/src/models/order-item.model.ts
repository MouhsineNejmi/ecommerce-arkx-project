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
}

const OrderItemModel = getModelForClass(OrderItem)

export default OrderItemModel
