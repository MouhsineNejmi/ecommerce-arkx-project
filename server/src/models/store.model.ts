import { prop, getModelForClass } from '@typegoose/typegoose'

export class Store {
  @prop({ required: true })
  name!: string
}

const StoreModel = getModelForClass(Store)

export default StoreModel
