import express, { Request, Response } from "express";
import "reflect-metadata";
//import UserRoutes from './features/user/routes/Routes';
import CategoriaRoutes from "./features/categorias/routes/Routes";
import ProdutoRoutes from "./features/produtos/routes/Routes";
import EstoqueRoutes from "./features/estoque/routes/Routes";

import Database from "./core/data/connections/Database";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("OK");
});

//const userRoutes = new UserRoutes().init();
const categoriaRoutes = new CategoriaRoutes().init();
const produtoRoutes = new ProdutoRoutes().init();
const estoqueRoutes = new EstoqueRoutes().init();

app.use(categoriaRoutes);
app.use(produtoRoutes);
app.use(estoqueRoutes);

new Database()
	.openConnection()
	.then(() => app.listen(8080, () => console.log("Servidor Iniciado")));
