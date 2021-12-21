import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import Database from "../../../core/data/connections/Database";
import { Categoria } from "../../../core/data/database/entities/Categoria";
import { Produto } from "../../../core/data/database/entities/Produto";

export default class ProdutoController {
	public async store(req: Request, res: Response) {
		/*const connection = new Database().getConnection();
			const result = await connection.query(
			`insert into produtos(uid, nome, descricao, categoria_uid) values('${uuid()}', '${nome}', '${descricao}', '${categoria_uid}')`
		); */

		const { nome, descricao, categoria_uid } = req.body;

		const categoria = await Categoria.findOne(categoria_uid);
		
		console.log(categoria);
		
		if(categoria){
			const produto = await new Produto(nome, descricao, categoria).save();
			console.log(produto);
			return res.status(200).send("produto criado");
		} else {
			return res.status(404).send("Categoria não encontrada");
		}		
	}

	public async index(req: Request, res: Response) {
		/* const connection = new Database().getConnection();
		const produtos = await connection.query("select * from produtos"); */

		const produtos = await Produto.find();
		return res.json(produtos);
	}

	public async view(req: Request, res: Response) {
	/* 	const connection = new Database().getConnection();

		
		const produto = await connection.query(
			`select p.nome, e.quantidade,c.nome as categoria from estoque e left join produtos p on e.produto_uid = p.uid left join categorias c on p.categoria_uid = c.uid where p.uid = '${uid}';`
			); */
			
		const { uid } = req.params;
		const produto = await Produto.findOne(uid);

		return res.json(produto);
	}

	public async update(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const { uid } = req.params;

		const { nome, descricao, categoria_uid } = req.body;

		if (nome && descricao && categoria_uid) {
			const result = await connection.query(`
            UPDATE categorias SET nome='${nome}', descricao='${descricao}', categoria_uid='${categoria_uid}' WHERE uid='${uid}'
            `);
			console.log(result);
			return res.status(200).send("produto atualizado");
		} else {
			return res.status(400).send("Parâmetros faltando");
		}
	}

	public async destroy(req: Request, res: Response) {
		const connection = new Database().getConnection();

		const { uid } = req.params;

		const result = await connection.query(`
            DELETE FROM produtos WHERE uid='${uid}'
        `);

		console.log(result);

		return res.status(200).send("Produto excluído com sucesso");
	}
}
