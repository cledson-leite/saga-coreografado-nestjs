import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Create1698512216256 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'sales',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
						unsigned: true,
					},
					{
						name: 'productId',
						type: 'int',
					},
					{
						name: 'userId',
						type: 'int',
					},
					{
						name: 'quantity',
						type: 'int',
					},
					{
						name: 'value',
						type: 'decimal',
						precision: 4,
						scale: 2,
					},
					{
						name: 'status',
						type: 'int',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('sales');
	}
}
