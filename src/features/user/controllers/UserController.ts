import { Request, Response } from 'express';
import Database from '../../../core/data/connections/Database';

export default class UserController {

    public async store(req: Request, res: Response){
        const connection = new Database().getConnection();

        const { login, password } = req.body;

        const result = await connection.query(`insert into...`);

        console.log(result);

        return res.status(200).send('customer criado');
    }

    public async index(req:Request, res: Response) {
        const connection = new Database().getConnection();

        const users = await connection.query('select * from users');

        return res.json(users);
    }
}

