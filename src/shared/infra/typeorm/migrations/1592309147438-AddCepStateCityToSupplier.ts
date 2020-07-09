import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCepStateCityToSupplier1592309147438
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'suppliers',
      new TableColumn({
        name: 'cep',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'suppliers',
      new TableColumn({
        name: 'state',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'suppliers',
      new TableColumn({
        name: 'city',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('suppliers', 'cep');
    await queryRunner.dropColumn('suppliers', 'state');
    await queryRunner.dropColumn('suppliers', 'city');
  }
}
