import {BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
import { v4 as uuid } from "uuid";
import { Produto } from "./Produto";


@Entity({name: 'estoque'})
export class Estoque extends BaseEntity{
    @PrimaryColumn()
	uid?: string;
    
    @Column()
    quantidade: number;

    @Column({ name: "created_at" })
	createdAt?: Date;

	@Column({ name: "updated_at" })
	updatedAt?: Date;

    @OneToOne(()=>Produto)
    @JoinColumn({name: 'produto_uid'})
    produto: Produto;

    constructor(
		quantidade: number,
        produto: Produto,
		uid?: string,
		createdAt?: Date,
		updatedAt?: Date
	) {
		super();
	
		this.quantidade = quantidade;
        this.produto = produto;
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
