import { prop, getModelForClass, Ref } from '@typegoose/typegoose'

import { Store } from './store.model'
import { Billboard } from './billboard.model'

export class Category {
  @prop({ required: true })
  name!: string

  @prop({ required: true })
  icon!: string

  @prop({ ref: () => Store })
  store!: Ref<Store>

  @prop({ ref: () => Billboard })
  billboard!: Ref<Billboard>
}

const CategoryModel = getModelForClass(Category)

export default CategoryModel
