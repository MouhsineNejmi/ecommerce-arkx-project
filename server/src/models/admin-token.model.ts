import { getModelForClass, prop, Ref } from '@typegoose/typegoose'

import { Admin } from './admin.model'

class AdminToken {
  @prop({ ref: () => Admin, required: true })
  user!: Ref<Admin>

  @prop({ required: true })
  accessToken!: string
}

const AdminTokenModel = getModelForClass(AdminToken)

export default AdminTokenModel
