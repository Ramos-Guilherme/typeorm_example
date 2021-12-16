import { Router } from 'express';

import ProdutoController from '../controllers/ProdutoController';

export default class Routes{

    public init(): Router {
        const routes = Router();

        const controller = new ProdutoController();

        routes.get('/produtos', controller.index);
        routes.get('/produtos/:uid', controller.view);
        routes.post('/produtos', controller.store);
        routes.put('/produtos/:uid', controller.update);
        routes.delete('/produtos/:uid', controller.destroy);
        
        return routes;
    }

}