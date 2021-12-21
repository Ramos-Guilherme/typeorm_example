import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class categoria1640044272258 implements MigrationInterface {
	private tabelaCategorias: Table = new Table({
		name: "categorias",
		columns: [
			{
				name: "uid",
				type: "uuid",
				isPrimary: true,
				isNullable: false,
			},
			{
				name: "nome",
				type: "varchar",
				length: "50",
				isNullable: false,
			},
			{
				name: "descricao",
				type: "varchar",
				length: "200",
				isNullable: false,
			},
			{
				name: "tag",
				type: "varchar",
				length: "50",
				isNullable: false,
			},
			{
				name: "created_at",
				type: "timestamp",
				isNullable: false,
			},
			{
				name: "updated_at",
				type: "timestamp",
				isNullable: false,
			},
		],
	});

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(this.tabelaCategorias);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("categorias");
	}
}
