import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddAddressToSupplier1592314716182
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'suppliers',
      new TableColumn({
        name: 'address',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('suppliers', 'address');
  }
}
