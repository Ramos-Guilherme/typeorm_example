import { Request, Response } from "express";
import Database from "../../../core/data/connections/Database";
import { Estoque } from "../../../core/data/database/entities/Estoque";
import { Produto } from "../../../core/data/database/entities/Produto";

export default class EstoqueController {
	public async store(req: Request, res: Response) {
		const { produto_uid, quantidade } = req.body;

		const produto = await Produto.findOne(produto_uid); //Busca o produto para verificar se existe e criar o item no estoque

		if(produto){ //Valida a existência do produto
			const estoque = await new Estoque(quantidade, produto).save(); //Adiciona item ao estoque
			console.log(estoque);
			return res.status(200).send("Item criado no estoque");
		}else {
			return res.status(400).send("Produto não encontrado");
		}
	}

	public async index(req: Request, res: Response) {
		const itens = await Estoque.find();

		return res.json(itens);
	}

	public async view(req: Request, res: Response) {
		const { uid } = req.params;

		const item = await Estoque.findOne(uid);
		return res.json(item);
	}

	public async update(req: Request, res: Response) {
		

		const { uid } = req.params;

		const { produto_uid, quantidade } = req.body;

		const produto = await Produto.findOne(produto_uid); //Busca o produto para verificar se existe e atualizar o item no estoque
		const item = await Estoque.findOne(uid); //Busca item no estoque pelo uid para validar se existe e portanto pode ser atualizado

		if (item && produto && quantidade) {
			const estoque = await new Estoque(quantidade, produto, uid).save();

			return res.status(200).send("Estoque atualizado");
		} else {
			return res.status(400).send("Parâmetros faltando");
		}
	}

	public async destroy(req: Request, res: Response) {
		const { uid } = req.params;

		const item = await Estoque.findOne(uid);

		if(item){
			const result = await Estoque.remove(item);
			console.log(result);
			return res.status(200).send("Item excluído com sucesso");
		}else {
			return res.status(404).send("Item não encontrado");
		}

	}
}
