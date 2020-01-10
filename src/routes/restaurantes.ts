import { Router } from 'express'
import RestauranteController from '../controllers/RestauranteController'

const restauranteRoutes = Router()

// GET restaurante home page.
restauranteRoutes.get('/restaurantes', RestauranteController.index);

// GET restaurante register page
restauranteRoutes.get('/restaurantes/create', RestauranteController.add);

// POST new restaurante
restauranteRoutes.post('/restaurantes/store', RestauranteController.store);

// POST request for creating Book.
//router.post('/restaurante/create', restaurante_controller.restaurante_create_post);

// GET request to delete Book.
restauranteRoutes.post('/restaurantes/delete/:id', RestauranteController.delete);

// POST request to delete Book.
//router.post('/restaurante/:id/delete', restaurante_controller.restaurante_delete_post);

// GET request to update Book.
//router.get('/restaurante/:id/update', restaurante_controller.restaurante_update_get);

// POST request to update Book.
restauranteRoutes.post('/restaurante/:id/update', RestauranteController.update);

// GET request for one Book.
//router.get('/restaurante/:id', restaurante_controller.book_detail);

// GET request for list of all Book items.
//router.get('/restaurantes', restaurante_controller.book_list);

export default restauranteRoutes

