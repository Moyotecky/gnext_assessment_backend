import express from  'express'
import * as adminController from '../controllers/admin.controller'

const router = express.Router()

//route for register
router.post('/create-admin', adminController.register)

//route for login
router.post('/login', adminController.login)


export default router

