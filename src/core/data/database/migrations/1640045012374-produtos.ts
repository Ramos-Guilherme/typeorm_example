import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class produtos1640045012374 implements MigrationInterface {
	private tableProdutos: Table = new Table({
		name: "produtos",
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
				name: "created_at",
				type: "timestamp",
				isNullable: false,
			},
            {
				name: "updated_at",
				type: "timestamp",
				isNullable: false,
			},
            {
				name: "categoria_uid",
				type: "uuid",
				isNullable: false,
			}
		],
	});

	public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.tableProdutos);

        await queryRunner.createForeignKey("produtos", new TableForeignKey({
            columnNames: ["categoria_uid"],
            referencedColumnNames: ["uid"],
            referencedTableName: "categorias",
            onDelete: "CASCADE"
        }));

    }

	public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('produtos');
    }
}
