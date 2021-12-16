import { Router } from 'express';

import CategoriaController from '../controllers/CategoriaController';

export default class Routes{

    public init(): Router {
        const routes = Router();

        const controller = new CategoriaController();

        routes.get('/categorias', controller.index);
        routes.get('/categorias/:uid', controller.view);
        routes.post('/categorias', controller.store);
        routes.put('/categorias/:uid', controller.update);
        routes.delete('/categorias/:uid', controller.destroy);
        
        return routes;
    }

}