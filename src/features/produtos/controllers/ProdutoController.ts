import { Request, Response } from "express";
import { Categoria } from "../../../core/data/database/entities/Categoria";
import { Produto } from "../../../core/data/database/entities/Produto";

export default class ProdutoController {
	public async store(req: Request, res: Response) {
		const { nome, descricao, categoria_uid } = req.body;

		const categoria = await Categoria.findOne(categoria_uid);

		console.log(categoria);

		if (categoria) {
			const produto = await new Produto(nome, descricao, categoria).save();
			console.log(produto);
			return res.status(200).send("produto criado");
		} else {
			return res.status(404).send("Categoria não encontrada");
		}
	}

	public async index(req: Request, res: Response) {
		const produtos = await Produto.find();
		return res.json(produtos);
	}

	public async view(req: Request, res: Response) {
		const { uid } = req.params;
		const produto = await Produto.findOne(uid);

		console.log(produto);

		return res.json(produto);
	}

	public async update(req: Request, res: Response) {
		const { uid } = req.params;

		const { nome, descricao, categoria_uid } = req.body;

		const produto = await Produto.findOne(uid);
		const categoria = await Categoria.findOne(categoria_uid);

		if (nome && descricao && categoria && produto) {
			const result = await new Produto(nome, descricao, categoria, uid);
			console.log(result);
			return res.status(200).send("produto atualizado");
		} else {
			return res.status(400).send("Parâmetros faltando");
		}
	}

	public async destroy(req: Request, res: Response) {
		const { uid } = req.params;

		const produto = await Produto.findOne(uid);

		if (produto) {
			const result = await Produto.remove(produto);
			console.log(result);
			return res.status(200).send("Produto excluído com sucesso");
		} else {
			return res.status(404).send("Produto não encontrado");
		}
	}
}
