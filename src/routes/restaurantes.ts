import { Router } from 'express'
import RestauranteController from '../controllers/RestauranteController'

const restauranteRoutes = Router()

restauranteRoutes.get('/restaurantes', RestauranteController.index);
restauranteRoutes.get('/restaurantes/create', RestauranteController.add);
restauranteRoutes.post('/restaurantes/store', RestauranteController.store);
restauranteRoutes.post('/restaurantes/delete/:id', RestauranteController.delete);
restauranteRoutes.get('/restaurantes/edit/:id', RestauranteController.edit);
restauranteRoutes.post('/restaurantes/update/:id', RestauranteController.update);
restauranteRoutes.post('/restaurantes/findByNome/', RestauranteController.update);
// GET request for one Book.
//router.get('/restaurante/:id', restaurante_controller.book_detail);


export default restauranteRoutes

