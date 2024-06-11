import { Router } from 'express'

import { login, getModerators, getSellers } from '../controllers/admin.controller'

const router = Router()

router.post('/login', login)
router.get('/moderators', getModerators)
router.get('/sellers', getSellers)

export default router
