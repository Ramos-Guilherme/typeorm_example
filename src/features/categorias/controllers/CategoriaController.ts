import { Request, Response } from "express";
import Database from "../../../core/data/connections/Database";
import { Categoria } from "../../../core/data/database/entities/Categoria";

export default class CategoriaController {
	
	public async store(req: Request, res: Response) {
		const { nome, descricao, tag } = req.body;

		const categoria: Categoria = await new Categoria(nome, descricao, tag).save();

		console.log(categoria);

		return res.status(200).send("categoria criada");
	}

	public async index(req: Request, res: Response) {
		const categorias = await Categoria.find();

		return res.json(categorias);
	}

	public async view(req: Request, res: Response) {
		const { uid } = req.params;

		const categoria: Categoria | undefined = await Categoria.findOne(uid);

		return res.json(categoria);
	}

	public async update(req: Request, res: Response) {
		const { uid } = req.params;

		const { nome, descricao, tag } = req.body;
		const categoria = await Categoria.findOne(uid);

		if (nome && descricao && tag && categoria) {
			const categoria = await new Categoria(nome, descricao, tag, uid).save();

			return res.status(200).send("categoria atualizada");
		} else {
			return res.status(400).send("Parâmetros faltando");
		}
	}

	public async destroy(req: Request, res: Response) {
		const { uid } = req.params;

		const categoria = await Categoria.findOne(uid);

		if(categoria) {
			const result = await Categoria.remove(categoria);
			
			console.log(result);

			return res.status(200).send("Categoria excluída com sucesso");
		} else {
			return res.status(404).send('Categoria não encontrada')
		}

		

		
	}
}
