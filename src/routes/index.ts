import { Router } from 'express'
import IndexController from '../controllers/IndexController'

const indexRoutes = Router()

indexRoutes.get('/', IndexController.index)

export default indexRoutes

