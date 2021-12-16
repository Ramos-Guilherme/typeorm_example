import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import Database from "../../../core/data/connections/Database";

export default class CategoriaController {
	public async store(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const { nome, descricao, tag } = req.body;

		const result = await connection.query(
			`insert into categorias(uid, nome, descricao, tag) values('${uuid()}', '${nome}', '${descricao}', '${tag}')`
		);

		console.log(result);

		return res.status(200).send("categoria criada");
	}

	public async index(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const categorias = await connection.query("select * from categorias");

		return res.json(categorias);
	}

	public async view(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const { uid } = req.params;

		const categoria = await connection.query(
			`select * from categorias where uid = '${uid}'`
		);

		return res.json(categoria);
	}

	public async update(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const { uid } = req.params;

		const { nome, descricao, tag } = req.body;

		if (nome && descricao && tag) {
			const result = await connection.query(`
            UPDATE categorias SET nome='${nome}', descricao='${descricao}', tag='${tag}' WHERE uid='${uid}'
            `);
			return res.status(200).send("categoria atualizada");
		} else {
			return res.status(400).send("Parâmetros faltando");
		}
	}

	public async destroy(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const { uid } = req.params;

		const result = await connection.query(`
            DELETE FROM categorias WHERE uid='${uid}'
        `);

		console.log(result);

		return res.status(200).send("Categoria excluída com sucesso");
	}
}
