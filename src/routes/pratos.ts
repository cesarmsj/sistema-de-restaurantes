import { Router } from 'express'
import PratoController from '../controllers/PratoController'

const pratoRoutes = Router()

pratoRoutes.get('/pratos', PratoController.index);
pratoRoutes.get('/pratos/create', PratoController.add);
pratoRoutes.post('/pratos/store', PratoController.store);
pratoRoutes.post('/pratos/delete/:id', PratoController.delete);
pratoRoutes.get('/pratos/edit/:id', PratoController.edit);
pratoRoutes.post('/pratos/update/:id', PratoController.update);
// GET request for one Book.
//router.get('/prato/:id', prato_controller.book_detail);


export default pratoRoutes