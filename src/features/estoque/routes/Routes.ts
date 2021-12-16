import { Router } from 'express';

import EstoqueController from '../controllers/EstoqueController';

export default class Routes{

    public init(): Router {
        const routes = Router();

        const controller = new EstoqueController();

        routes.get('/estoque', controller.index);
        routes.get('/estoque/:uid', controller.view);
        routes.post('/estoque', controller.store);
        routes.put('/estoque/:uid', controller.update);
        routes.delete('/estoque/:uid', controller.destroy);
        
        return routes;
    }

}