import { prop, Ref, getModelForClass } from '@typegoose/typegoose'

import { Category } from './category.model'
import { User } from './user.model'

export class Billboard {
  @prop({ required: true })
  name!: string

  @prop({ ref: () => Category })
  category!: Ref<Category>

  @prop({ ref: () => Billboard })
  billboard!: Ref<Billboard>

  @prop({ ref: () => User })
  user!: Ref<User>
}

const BillboardModel = getModelForClass(Billboard)

export default BillboardModel
