import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Produto } from "./Produto";

@Entity({ name: "categorias" })
export class Categoria extends BaseEntity {
	@PrimaryColumn()
	uid?: string;

	@Column()
	nome: string;

	@Column()
	descricao: string;

	@Column()
	tag: string;

	@Column({ name: "created_at" })
	createdAt?: Date;

	@Column({ name: "updated_at" })
	updatedAt?: Date;

	@OneToMany(() => Produto, produto => produto.categoria)
    produtos?: Produto[];

	
	constructor(
		nome: string,
		descricao: string,
		tag: string,
		uid?: string,
		createdAt?: Date,
		updatedAt?: Date
	) {
		super();
		this.nome = nome;
		this.descricao = descricao;
		this.tag = tag;
		this.uid = uid;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
    @BeforeInsert()
    private beforeInsert(){
        console.log('before insert');
        this.uid = uuid();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    private beforeUpdate() {
        console.log('before update');
        this.updatedAt = new Date();
    }
}
