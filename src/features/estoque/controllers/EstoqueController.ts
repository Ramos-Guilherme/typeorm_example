import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import Database from "../../../core/data/connections/Database";

export default class EstoqueController {
	public async store(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const { produto_uid, quantidade } = req.body;

		const result = await connection.query(
			`insert into estoque(uid, produto_uid, quantidade) values('${uuid()}', '${produto_uid}', ${Number(quantidade)})`
		);

		console.log(result);

		return res.status(200).send("Item criado no estoque");
	}

	public async index(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const itens = await connection.query("select * from estoque");

		return res.json(itens);
	}

	public async view(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const { uid } = req.params;

		const estoque = await connection.query(
			`select * from estoque where uid = '${uid}'`
		);

		return res.json(estoque);
	}

	public async update(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const { uid } = req.params;

		const { produto_uid, quantidade } = req.body;

		if (produto_uid && quantidade) {
			const result = await connection.query(`
            UPDATE estoque SET produto_uid='${produto_uid}', quantidade=${Number(quantidade)} WHERE uid='${uid}'
            `);
			return res.status(200).send("Estoque atualizado");
		} else {
			return res.status(400).send("Parâmetros faltando");
		}
	}

	public async destroy(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const { uid } = req.params;

		const result = await connection.query(`
            DELETE FROM estoque WHERE uid='${uid}'
        `);

		console.log(result);

		return res.status(200).send("Item excluído com sucesso");
	}
}
