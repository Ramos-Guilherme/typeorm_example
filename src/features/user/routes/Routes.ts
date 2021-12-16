import { Router } from 'express';

import UserController from '../controllers/UserController';

export default class Routes{

    public init(): Router {
        const routes = Router();

        const controller = new UserController();

        routes.post('/users', controller.store);
        routes.get('/users', controller.index);

        return routes;
    }

}