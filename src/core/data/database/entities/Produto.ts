import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Categoria } from "./Categoria";
import { Estoque } from "./Estoque";

@Entity({ name: "produtos" })
export class Produto extends BaseEntity {
	@PrimaryColumn()
	uid?: string;

	@Column()
	nome: string;

	@Column()
	descricao: string;

	@Column({ name: "created_at" })
	createdAt?: Date;

	@Column({ name: "updated_at" })
	updatedAt?: Date;

	@OneToMany(() => Categoria, (categoria) => categoria.produtos)
	@JoinColumn({ name: "categoria_uid" })
	categoria: Categoria;

	@OneToOne(() => Estoque)
	estoque?: Estoque;

	constructor(
		nome: string,
		descricao: string,
		categoria: Categoria,
		uid?: string,
		createdAt?: Date,
		updatedAt?: Date
	) {
		super();
		this.nome = nome;
		this.descricao = descricao;
		this.categoria = categoria;
		this.uid = uid;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
	@BeforeInsert()
	private beforeInsert() {
		console.log("before insert");
		this.uid = uuid();
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	@BeforeUpdate()
	private beforeUpdate() {
		console.log("before update");
		this.updatedAt = new Date();
	}
}
