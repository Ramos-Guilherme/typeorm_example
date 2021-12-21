import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class estoque1640045544364 implements MigrationInterface {
	private tableEstoque: Table = new Table({
		name: "estoque",
		columns: [
			{
				name: "uid",
				type: "uuid",
				isPrimary: true,
				isNullable: false,
			},
            {
				name: "quantidade",
				type: "int4",
				isNullable: false
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
				name: "produto_uid",
				type: "uuid",
				isNullable: false
			}
		]
	});

	public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.tableEstoque);
        await queryRunner.createForeignKey("estoque", new TableForeignKey({
            columnNames: ["produto_uid"],
            referencedColumnNames: ["uid"],
            referencedTableName: "produtos",
            onDelete: "CASCADE"
        }));
    }

	public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('estoque');
    }
}
