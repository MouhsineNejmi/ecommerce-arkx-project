import { prop, getModelForClass, Ref } from '@typegoose/typegoose'

import { Store } from './store.model'

export class Product {
  @prop({ required: true })
  title!: string

  @prop({ required: true })
  description!: string

  @prop({ required: true })
  price!: number

  @prop({ default: false })
  is_featured?: boolean

  @prop({ default: false })
  is_archived?: boolean

  @prop({ ref: () => Store, required: true })
  store!: Ref<Store>
}

const ProductModel = getModelForClass(Product)

export default ProductModel
